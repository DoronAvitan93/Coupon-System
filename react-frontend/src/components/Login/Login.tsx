
import { useState, Fragment, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authRedux';
import MessageModal from '../UI/MessageModal';
import { useNavigate } from "react-router-dom";
import Button from '../UI/Button';
import './Login.css'
import Card from '../UI/Card';



const Login: React.FC = () => {

    sessionStorage.setItem('loggedInSession', '1');

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const selectUserTypeRef = useRef<HTMLSelectElement>(null);
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();


    const [messageState, setMessageState] = useState<{ title: string, message: string, messageToken?: string }>(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const loginHandler = async (event) => {
        try {
            event.preventDefault()

            //check the inputs 
            if (selectUserTypeRef.current.value === "Choose client" ||
                emailRef.current.value.trim().length === 0 ||
                passwordRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter valid inputs" })
                return;
            }
            console.log(selectUserTypeRef.current.value)

            const response = await fetch("https://doron-coupon-web-app.herokuapp.com/CouponApp/login/" + selectUserTypeRef.current.value + "/" + selectUserTypeRef.current.value + "/" + emailRef.current.value + "/" + passwordRef.current.value)

            const responseFromLogin = await response.text();

            console.log("who trying to log in: " + selectUserTypeRef.current.value)
            if (response.status === 400) { //BAD REQUEST

                setMessageState({ title: "Wrong E-mail or Password! ", message: "E-mail or password are incorrect." })
                //response from controller
                throw new Error(responseFromLogin)
            }

            //if ok
            console.log("Response from login: " + responseFromLogin)
            if (selectUserTypeRef.current.value === "Customer") {
                setMessageState({ title: "Customer logged successfully!", message: "You have been logged in to Coupon system!", messageToken: "You have 30 minutes before you need to re-login again" })
                dispatch(authActions.setClientTypeCustomer())
                dispatch(authActions.setCustomerIdAfterLogin(responseFromLogin))
                console.log("dispatch client type: " + selectUserTypeRef.current.value)


                //30 mins "Token"
                const timer = setTimeout(function () {
                    localStorage.clear();
                    console.log("CLEARING LOCAL STORAGE");
                    dispatch(authActions.setIsAuthFalse());
                    console.log("LoginOut - 30 mins pass, no token - need to Login again");
                    dispatch(authActions.setIsRelogin(true));
                    navigate("/home")
                    //5 minutes for example
                }, 1000 * 60 * 30);
            }

            if (selectUserTypeRef.current.value === "Company") {
                setMessageState({ title: "Company logged in successfully!", message: "You have been logged in to Coupon system!", messageToken: "You have 30 minutes before you need to re-login again" })
                dispatch(authActions.setClientTypeCompany())
                dispatch(authActions.setCompanyIdAfterLogin(responseFromLogin))
                console.log("dispatch client type: " + selectUserTypeRef.current.value)



                //30 mins "Token"
                const timer = setTimeout(function () {
                    localStorage.clear();
                    console.log("CLEARING LOCAL STORAGE");
                    dispatch(authActions.setIsAuthFalse());
                    console.log("LoginOut - 30 mins pass, no token - need to Login again");
                    dispatch(authActions.setIsRelogin(true));
                    navigate("/home")
                    //5 minutes for example
                }, 1000 * 60 * 30);

            }
            if (selectUserTypeRef.current.value === "Administrator") {
                setMessageState({ title: "Welcome back Admin !", message: "You have been logged in to Coupon system", messageToken: "You have 30 minutes before you need to re-login again" })
                dispatch(authActions.setClientTypeAdmin())
                dispatch(authActions.setAdminIdAfterLogin(responseFromLogin));
                console.log("dispatch client type: " + selectUserTypeRef.current.value)




                //30 mins "Token"
                const timer = setTimeout(function () {
                    sessionStorage.clear();
                    localStorage.clear();
                    console.log("CLEARING LOCAL STORAGE");
                    dispatch(authActions.setIsAuthFalse());
                    console.log("LoginOut - 30 mins pass, no token - need to Login again");
                    dispatch(authActions.setIsRelogin(true));
                    navigate("/home")
                    //5 minutes for example
                }, 1000 * 60 * 30);
            }


            setLoggedIn(true);


            // restart values
            selectUserTypeRef.current.value = ''
            emailRef.current.value = ''
            passwordRef.current.value = ''

            dispatch(authActions.setIsAuthTrue())

            console.log("dispatch Auth to true")
        }

        catch (error) {
            console.log("catching: " + error.message)

        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }

    const onMessageLoginConfirm = () => {
        navigate("/home")
        setMessageState(null);
    }


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
                        onConfirm={onMessageConfirmHandler}
                    />}


                <form onSubmit={loginHandler} >

                    <label className='label'>Client Type</label>
                    <select className='input__select' ref={selectUserTypeRef}  >
                        <option hidden>Choose client</option>
                        <option value="Customer">Customer</option>
                        <option value="Company">Company</option>
                        <option value="Administrator">Admin</option>
                    </select>
                    <br />

                    <label className='label'>E-Mail</label>
                    <input className='input' type="email" ref={emailRef} />
                    <br />

                    <label className='label'>Password</label>
                    <input className='input' type="password" ref={passwordRef} />
                    <br />

                    <Button type="submit">Login!</Button>
                </form>

            </Card>
        </Fragment >
    )
}


export default Login;