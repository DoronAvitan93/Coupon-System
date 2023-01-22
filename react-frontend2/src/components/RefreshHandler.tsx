import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authRedux";



const RefreshHandler = () => {


    //local storage
    const loggedInStorageInfo = localStorage.getItem('isLogged');

    //session storage
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

    }
    )

    //if client close the browser / tab (because we use "Token" like system(at Login.tsx))
    if (sessionInfo !== '1') {
        localStorage.clear();
    }


    //doesnt return anything
    return (
        <></>
    );
}


export default RefreshHandler;
