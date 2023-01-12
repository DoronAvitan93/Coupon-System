import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../store/reduxIndex";
import MessageModal from "../UI/MessageModal";
import NavGeneral from "../UI/Nav";
import Card from "../UI/Card";
import { authActions } from "../../store/authRedux";


const Home: React.FC = () => {

    const isAuth = useSelector<RootState>(state => state.authRedux.isAuthenticated);
    const isAuthType = useSelector<RootState>(state => state.authRedux.clientType);
    const isAuthType22= useSelector<RootState>(state => state.authRedux.clientType);

    //using this to change messageState
    const isNeedToReLogin = useSelector<RootState>(state => state.authRedux.isNeedToReLogin);
    const [messageState, setMessageState] = useState<{ title: string, message: string }>();


    const dispatch = useDispatch()


    //using isNeedToReLogin in Login.tsx to be true after 30 minutes, so the user have to re-login.
    useEffect(() => {
        if (isNeedToReLogin) {
            setMessageState({ title: "Timeout", message: "Your Token time is expired - please re-login" })
        }

    }, [isNeedToReLogin]
    )


    const onMessageConfirmHandler = () => {
        setMessageState(null);
        dispatch(authActions.setIsRelogin(false))

    }


    return (
        <Fragment>
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}


                <NavGeneral>
                    {!isAuth &&
                        <>
                            <h1>Hello,<br /> Please Log-In</h1>
                            <ul>
                                <li>
                                    <NavLink to='/login'>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/register'>Register</NavLink>
                                </li>
                            </ul>
                        </>}


                    {/* //admin components */}
                    {isAuth && isAuthType === "Administrator" &&
                        <><ul>
                            <li>
                                <NavLink to='/AdminUpdateCompany'>Update Company</NavLink>
                            </li>

                            <li>
                                <NavLink to='/AdminDeleteCompany'>Delete Company</NavLink>
                            </li>

                            <li>
                                <NavLink to='/AdminGetAllCompanies'>Get all Companies</NavLink>
                            </li>

                            <li>
                                <NavLink to='/AdminGetOneCompany'>Get one Company</NavLink>
                            </li>
                        </ul>

                            <br />

                            <ul>
                                <li>
                                    <NavLink to='/AdminUpdateCustomer'>Update Customer</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/AdminDeleteCustomer'>Delete Customer</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/AdminGetAllCustomers'>Get all Customers</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/AdminGetOneCustomer'>Get one Customer</NavLink>
                                </li>
                            </ul></>}


                    {/* //company components */}
                    {isAuth && isAuthType === "Company" &&
                        <><ul>
                            <li>
                                <NavLink to='/CompanyAddCoupon'>Add Coupon</NavLink>
                            </li>

                            <li>
                                <NavLink to='/CompanyUpdateCoupon'>Update Coupon</NavLink>
                            </li>

                            <li>
                                <NavLink to='/CompanyDeleteCoupon'>Delete Coupon</NavLink>
                            </li>
                        </ul>

                            <br />

                            <ul>
                                <li>
                                    <NavLink to='/GetCompanyCouponOptions'>Get Company Coupons</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/GetCompanyDetails'>Get Company Details</NavLink>
                                </li>
                            </ul></>
                    }


                    {/* //customer components */}
                    {isAuth && isAuthType === "Customer" &&
                        <>
                            <ul>
                                <li>
                                    <NavLink to='/PurchaseCoupon'>Purchase Coupon</NavLink>
                                </li>
                            </ul>
                            <br />
                            <ul>
                                <li>
                                    <NavLink to='/GetCustomerDetails'>Customer Details</NavLink>
                                </li>

                                <li>
                                    <NavLink to='/GetCustomerCouponOptions'>Customer Coupons</NavLink>
                                </li>
                            </ul>
                        </>
                    }
                </NavGeneral>
            </Card>
        </Fragment>
    );
};

export default Home;
