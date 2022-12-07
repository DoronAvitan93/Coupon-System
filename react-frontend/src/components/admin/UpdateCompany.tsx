import { Fragment, useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'

type Props = {

}


const UpdateCompany = (props) => {

    const companyIdRef = useRef<HTMLInputElement>();//company ID to update
    const emailRef = useRef<HTMLInputElement>(); //email to update
    const passwordRef = useRef<HTMLInputElement>(); //password to update


    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const updateCompanyHandler = async (event) => {
        try {

            event.preventDefault()

            //check the inputs 
            if (companyIdRef.current.value.trim().length === 0 ||
                emailRef.current.value.trim().length === 0 ||
                passwordRef.current.value.trim().length === 0) {
                setMessageState({ title: "Invalid input", message: "Please enter a valid inputs value! (No empty values)" });
                return;
            }

            console.log("Company ID to update before using onlyDigitsForCompanyIdRef: " + companyIdRef.current.value)
            // console.log("Company ID to update after using onlyDigitsForCompanyIdRef: " + onlyDigitsForCompanyIdRef)
            console.log("updating email: " + emailRef.current.value)
            console.log("updating password: " + passwordRef.current.value)

            const dataToSend = {
                id: companyIdRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            }

            const requestOptions =
            {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            }

            const response = await fetch("http://localhost:8080/CouponApp/updateCompany/", requestOptions);

            const responseFromUpdateCompany = await response.text();

            if (response.status === 400) { //BAD REQUEST
                console.log("Company by ID given to update: " + companyIdRef.current.value)
                setMessageState({ title: "Oops! something went wrong!", message: responseFromUpdateCompany })
                //response from controller
                throw new Error(responseFromUpdateCompany)
            }

            setMessageState({ title: "Company has been updated!", message: "Company - E-Mail & Password has been updated successfully!" })
            console.log(responseFromUpdateCompany);

            // restart values
            companyIdRef.current.value = ''
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

                <form onSubmit={updateCompanyHandler}>

                    <label className='label'>Company ID</label>
                    <input className='input' type="number" ref={companyIdRef} />
                    <br />

                    <label className='label'>New E-Mail</label>
                    <input className='input' type="email" ref={emailRef} />
                    <br />

                    <label className='label'>New Password</label>
                    <input className='input' type="password" ref={passwordRef} />
                    <br />

                    <Button type="submit">Update company</Button>
                </form>
            </Card>
        </Fragment>
    )
}


export default UpdateCompany;