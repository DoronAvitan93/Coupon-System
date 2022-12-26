
import { Fragment, useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'


const DeleteCustomer = () => {


    //customer ID to delete
    const customerIdRef = useRef<HTMLInputElement>();

    //popup message
    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const updateCompanyHandler = async (event) => {
        event.preventDefault()


        //check input
        if (customerIdRef.current.value.trim().length === 0) {
            setMessageState({ title: "Invalid input", message: "Please enter a valid inputs value! (No empty values)" })
            return;
        }


        try {

            const requestOptions =
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            }

            //java server side
            const response = await fetch("http://localhost:8080/CouponApp/deleteCustomer/" + customerIdRef.current.value, requestOptions);

             //using the first response from the server - to text
            const responseFromUpdateCustomer = await response.text();

            if (response.status === 400) { //BAD REQUEST
                console.log("Customer by ID given to delete: " + customerIdRef.current.value)
                setMessageState({ title: "Oops! something went wrong!", message: responseFromUpdateCustomer })
                //response from controller
                throw new Error(responseFromUpdateCustomer)
            }

            //if success (response status !== 400)
            setMessageState({ title: "Customer has been deleted!", message: "Customer has been deleted from the system successfully!" })

            // restart values
            customerIdRef.current.value = ''
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

                    <label className='label'>Customer ID</label>
                    <input className='input' type="text" ref={customerIdRef} />
                    <br />

                    <Button type="submit">Delete customer</Button>
                </form>
            </Card>
        </Fragment>
    )
}


export default DeleteCustomer;