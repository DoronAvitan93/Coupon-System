import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/authRedux';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';



const GuestLogin = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [messageState, setMessageState] = useState<{ title: string, message: string, messageToken?: string }>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const loginHandler = async () => {
        try {
            const response = await fetch("https://doron-coupon-web-app.herokuapp.com/CouponApp/login/Customer/Customer/guest@guest/guest")

            const responseFromLogin = await response.text();

            if (!response.ok) { //BAD REQUEST or SERVER ERROR

                setMessageState({ title: "Error ", message: "Something went wrong, please try again." })
                //response from controller
                throw new Error(responseFromLogin)
            }

            //if ok
            setMessageState({ title: "Logged as Guest successfully!", message: "You have been logged in to Coupon system!", messageToken: "You have 30 minutes before you need to re-login again" })
            dispatch(authActions.setClientTypeCustomer())
            dispatch(authActions.setCustomerIdAfterLogin(responseFromLogin))


            //30 mins "Token"
            const timer = setTimeout(function () {
                sessionStorage.clear();
                localStorage.clear();
                console.log("CLEARING LOCAL STORAGE");
                dispatch(authActions.setIsAuthFalse());
                console.log("LoginOut - 30 mins pass, no token - need to Login again");
                dispatch(authActions.setIsRelogin(true));
                navigate("/home")
                //30 minutes
            }, 1000 * 60 * 30);


            setLoggedIn(true);

            dispatch(authActions.setIsAuthTrue())
            // console.log("dispatch Auth to true")
        }

        catch (error) {
            console.log("catching: " + error.message)

        }
    }


    const onMessageConfirmErrorHandler = () => {
        setMessageState(null);
    }

    const onMessageLoginConfirm = () => {
        navigate("/home")
        setMessageState(null);
    }

    useEffect(() => {
        loginHandler();
    }, [])


    return (
        <Fragment>
            <Card>
                {/* if logged in successfully - will use onMessageLoginConfirm() to navigate home */}
                {messageState && loggedIn &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        messageToken={messageState.messageToken}
                        onConfirm={onMessageLoginConfirm}
                    />}

                {/* if NOT logged in successfully - will use onMessageConfirmHandler() to try */}
                {messageState && !loggedIn &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        messageToken={messageState.messageToken}
                        onConfirm={onMessageConfirmErrorHandler}
                    />}
            </Card>
        </Fragment >
    )
}

export default GuestLogin

