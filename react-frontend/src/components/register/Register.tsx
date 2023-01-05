import { Fragment, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';



const Register = (props) => {

    const navigate = useNavigate();

    //user client type: Customer / Client
    const selectUserTypeRef = useRef<HTMLSelectElement>(); //register clientType
    const [isShown, setIsShown] = useState(false);

    const nameRef = useRef<HTMLInputElement>(); //register name
    const lastNameRef = useRef<HTMLInputElement>();//register lastName
    const emailRef = useRef<HTMLInputElement>(); //register email
    const passwordRef = useRef<HTMLInputElement>(); //register password


    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);
    const [selectUserTypeUseState, setselectUserTypeUseState] = useState("Customer")


    const selectedUserTypeOnChangeHandler = (event) => {
        setselectUserTypeUseState(event.target.value)
        setIsShown(true);
    }


    const registerCompany = async (event) => {
        try {

            event.preventDefault()
            //check the inputs 
            if (nameRef.current.value.trim().length === 0 ||
                emailRef.current.value.trim().length === 0 ||
                passwordRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter a valid name / email / password (No empty values)" })
                return;
            }

            let dataToSend = null;

            if (selectUserTypeRef.current.value === "Company") {
                dataToSend = {
                    //company
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                }
            }

            if (selectUserTypeRef.current.value === "Customer") {
                //customer
                dataToSend = {
                    firstName: nameRef.current.value,
                    lastName: lastNameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                }
            }

            const requestOptions =
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            }

            let response = null;

            if (selectUserTypeRef.current.value === "Company") {
                response = await fetch("https://doron-coupon-web-app.herokuapp.com/CouponApp/addCompany", requestOptions)
            }
            if (selectUserTypeRef.current.value === "Customer") {
                response = await fetch("https://doron-coupon-web-app.herokuapp.com/CouponApp/addCustomer", requestOptions)
            }

            const responseFromDbAfterRegister = await response.text();

            if (response.status === 400) { //BAD REQUEST
                console.log(selectUserTypeRef.current.value)
                //if its a company trying to register:
                if (selectUserTypeRef.current.value === "Company") {
                    setMessageState({ title: "Company already exist!", message: "Please try different E-mail or Name" })
                    //response from controller
                    throw new Error(responseFromDbAfterRegister)
                }
                if (selectUserTypeRef.current.value === "Customer") {
                    setMessageState({ title: "Customer already exist!", message: "Please try different E-mail or Name" })
                    //response from controller
                    throw new Error(responseFromDbAfterRegister)
                }
                return;
            }

            //response from controller with details if OK
            console.log(responseFromDbAfterRegister)
            //using the error modal also as success registering message
            if (selectUserTypeRef.current.value === "Company") {
                setMessageState({ title: "Company register successfully!", message: "You have been registered to Coupon system!" })
            }
            if (selectUserTypeRef.current.value === "Customer") {
                setMessageState({ title: "Customer register successfully!", message: "You have been registered to Coupon system!" })
            }



            //restart values
            nameRef.current.value = ''
            emailRef.current.value = ''
            passwordRef.current.value = ''

            //catching error
        } catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
        navigate("/home")
    }

    const isShownHandler = () => {
        setIsShown(true)
    }






    return (
        <Fragment>
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}

                <form onSubmit={registerCompany}>
                    <label className='label'>Client Type</label>
                    <select className='input__select' onChange={selectedUserTypeOnChangeHandler} ref={selectUserTypeRef}>
                        <option hidden >Choose client</option>

                        <option value="Company">Company</option>
                        <option value="Customer">Customer</option>
                    </select>
                    <br />

                    {selectUserTypeUseState === "Company" &&
                        <>
                            <label className='label'>Company name</label>
                            <input className='input' type="text" ref={nameRef} />
                            <br />
                        </>
                    }

                    {selectUserTypeUseState === "Customer" && isShown &&
                        <>
                            <label className='label'>First name</label><input className='input' type="text" ref={nameRef} />
                            <br />

                            <label className='label'>Last Name</label><input className='input' type="text" ref={lastNameRef} />
                            <br />
                        </>
                    }



                    <label className='label'>E-Mail</label>
                    <input className='input' type="email" ref={emailRef} />
                    <br />

                    <label className='label'>Password</label>
                    <input className='input' type="password" ref={passwordRef} />
                    <br />

                    <Button type="submit">Register!</Button>

                </form>
            </Card>
        </Fragment >
    )
}


export default Register;
