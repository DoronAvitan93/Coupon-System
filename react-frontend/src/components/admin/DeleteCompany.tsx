
import { Fragment, useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'


const DeleteCompany = () => {


    //company ID to update
    const companyIdRef = useRef<HTMLInputElement>();

    //popup message
    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const updateCompanyHandler = async (event) => {
        event.preventDefault()

        //check input
        if (companyIdRef.current.value.trim().length === 0) {
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
            const response = await fetch("http://localhost:8080/CouponApp/deleteCompanyById/" + companyIdRef.current.value, requestOptions);

            //using the first response from the server - to text
            const responseFromUpdateCompany = await response.text();

            if (response.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! something went wrong!", message: responseFromUpdateCompany })

                // restart values
                companyIdRef.current.value = ''

                //response from controller
                throw new Error(responseFromUpdateCompany)
            }

            //if success (response status !== 400)
            setMessageState({ title: "Company has been deleted!", message: "Company has been deleted from the system successfully!" })


            // restart values
            companyIdRef.current.value = ''
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
                    <div>
                        <Button type="submit">Delete company</Button>
                    </div>
                </form>
            </Card>


        </Fragment>
    )
}


export default DeleteCompany;