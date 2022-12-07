
import { Fragment, useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'

type Props = {

}


const UpdateCompany = (props) => {

    const customerIdRef = useRef<HTMLInputElement>();//customer ID to update
    const firstNameRef = useRef<HTMLInputElement>(); //firstName to update
    const lastNameRef = useRef<HTMLInputElement>(); //lastName to update
    const emailRef = useRef<HTMLInputElement>(); //email to update
    const passwordRef = useRef<HTMLInputElement>(); //password to update


    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const updateCustomerHandler = async (event) => {

        try {

            event.preventDefault()

            // const onlyDigitsForCustomerIdRef = customerIdRef.current.value.replace(/\D/g, '');

            // if (onlyDigitsForCustomerIdRef === '') {
            //     setMessageState({ title: "Invalid input", message: "Please enter only Digits for customerID" });
            //     customerIdRef.current.value = '';
            //     return;
            // }

            //check the inputs 
            if (customerIdRef.current.value.trim().length === 0 ||
                firstNameRef.current.value.trim().length === 0 ||
                lastNameRef.current.value.trim().length === 0 ||
                emailRef.current.value.trim().length === 0 ||
                passwordRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter a valid inputs value! (No empty values)" })
                return;
            }



            console.log("Customer ID to update before using onlyDigitsForCustomerIdRef: " + customerIdRef.current.value)
            // console.log("Customer ID to update after using onlyDigitsForCustomerIdRef: " + onlyDigitsForCustomerIdRef)
            console.log("updating first name: " + firstNameRef.current.value)
            console.log("updating last name: " + lastNameRef.current.value)
            console.log("updating email: " + emailRef.current.value)
            console.log("updating password: " + passwordRef.current.value)

            const dataToSend = {
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }

            const requestOptions =
            {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            }

            const response = await fetch("http://localhost:8080/CouponApp/updateCustomer/" + customerIdRef.current.value, requestOptions);

            const responseFromUpdateCustomer = await response.text();

            if (response.status === 400) { //BAD REQUEST
                console.log("Customer by ID given to update: " + customerIdRef.current.value)
                setMessageState({ title: "Oops! something went wrong!", message: responseFromUpdateCustomer })
                //response from controller
                throw new Error(responseFromUpdateCustomer)
            }

            setMessageState({ title: "Customer has been updated!", message: "Customer - First Name, Last Name, E-Mail & Password has been updated successfully!" })
            console.log(responseFromUpdateCustomer);

            // restart values
            customerIdRef.current.value = ''
            firstNameRef.current.value = ''
            lastNameRef.current.value = ''
            emailRef.current.value = ''
            passwordRef.current.value = ''
        }

        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }


    return (
        <Fragment>
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}

                <form onSubmit={updateCustomerHandler}>

                    <label className='label'>Customer ID</label>
                    <input className='input' type="number" ref={customerIdRef} />
                    <br />

                    <label className='label'>New first name</label>
                    <input className='input' type="text" ref={firstNameRef} />
                    <br />

                    <label className='label'>New last name</label>
                    <input className='input' type="text" ref={lastNameRef} />
                    <br />

                    <label className='label'>New E-Mail</label>
                    <input className='input' type="email" ref={emailRef} />
                    <br />

                    <label className='label'>New password</label>
                    <input className='input' type="password" ref={passwordRef} />
                    <br />

                    <Button type="submit">Update customer</Button>
                </form>

            </Card>
        </Fragment>
    )
}


export default UpdateCompany;