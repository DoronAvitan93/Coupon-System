
import { useState, Fragment, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authRedux';
import MessageModal from '../UI/MessageModal';
import { useNavigate } from "react-router-dom";
import Button from '../UI/Button';
import Card from '../UI/Card';
import './Login.css'




type Props = {

}


const Login: React.FC<Props> = (props: Props) => {

    sessionStorage.setItem('loggedInSession', '1');

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const selectUserTypeRef = useRef<HTMLSelectElement>(null);
    const emailRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();


    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const loginHandler = async (event) => {
        try {
            event.preventDefault()

            //check the inputs 
            if (selectUserTypeRef.current.value === null ||
                emailRef.current.value.trim().length === 0 ||
                passwordRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter inputs" })
                return;
            }


            const response = await fetch("http://localhost:8080/CouponApp/login/" + selectUserTypeRef.current.value + "/" + selectUserTypeRef.current.value + "/" + emailRef.current.value + "/" + passwordRef.current.value)

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
                setMessageState({ title: "Customer logged successfully!", message: "You have been logged in to Coupon system!" })
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
                }, 1000 * 60 * 5);
            }

            if (selectUserTypeRef.current.value === "Company") {
                setMessageState({ title: "Company logged in successfully!", message: "You have been logged in to Coupon system!" })
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
                }, 1000 * 10);

            }
            if (selectUserTypeRef.current.value === "Administrator") {
                setMessageState({ title: "Welcome back Admin !", message: "You have been logged in to Coupon system" })
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
                }, 1000 * 10);
            }



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
        navigate("/home")
        setMessageState(null);


    }


    return (
        <Fragment>


            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}

                <form onSubmit={loginHandler} >

                    <label className='label'>Client Type</label>
                    <select className='input__ClientType' ref={selectUserTypeRef}  >
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