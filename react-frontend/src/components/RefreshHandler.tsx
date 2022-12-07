import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/authRedux";
import { RootState } from "../store/reduxIndex";



const RefreshHandler = (props) => {


    const clientType = useSelector<RootState>(state => state.authRedux.clientType);

    const loggedInStorageInfo = localStorage.getItem('isLogged');
    const sessionInfo = sessionStorage.getItem("isLoggedSession");

    const adminID = localStorage.getItem('adminID');

    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedInStorageInfo === "1" && sessionInfo === "1" && adminID === "19584413") { //Admin
            dispatch(authActions.setIsAuthTrue())
            dispatch(authActions.setClientTypeAdmin())
        }
        if (loggedInStorageInfo === "2" && sessionInfo === "1") { //Company
            dispatch(authActions.setIsAuthTrue())
            dispatch(authActions.setClientTypeCompany())
            dispatch(authActions.setCompanyIdAfterLogin(localStorage.getItem('companyID')))

        }
        if (loggedInStorageInfo === "3" && sessionInfo === "1") { //Customer
            dispatch(authActions.setIsAuthTrue())
            dispatch(authActions.setClientTypeCustomer())
            dispatch(authActions.setCustomerIdAfterLogin(localStorage.getItem('customerID')))
        }

    }, [clientType]
    )




    return (
        <></>
    );
}


export default RefreshHandler;
