
import { Fragment, useEffect, useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'

type Props = {

}


const GetOneCustomer = (props) => {


    const customerIdRef = useRef<HTMLInputElement>();

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const [customer, setCustomer] = useState(null)


    const getCustomerHandler = async (event) => {
        try {
            event.preventDefault();

            //check the input
            if (customerIdRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter a valid Customer ID (No empty values)" })
                return;
            }

            const response1 = await fetch("http://localhost:8080/CouponApp/findCustomerById/" + customerIdRef.current.value);
            const response2 = response1.clone();
            const responseFromGetCustomer = await response1.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetCustomer })
                throw new Error(responseFromGetCustomer) // throwing error to stop code to continue and making error
            }

            //if it pass the first "IF" - then:
            const data = await response2.json();
            setCustomer(data);
            console.log("Got customer: " + JSON.stringify(data))
        }


        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }

    const onClickFindAnotherCustomer = () => {
        setCustomer(null);
    }


    return (
        <Fragment>
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}

                {!customer &&
                    <form onSubmit={getCustomerHandler}>
                        <label className='label'>Customer ID</label>
                        <input className='input' type="text" ref={customerIdRef} />
                        <br />

                        <Button type="submit">Get customer</Button>
                    </form>
                }

                {customer &&
                    <ul >
                        <li>
                            <h3>Customer first name:</h3> <h5>{customer.firstName}</h5>
                            <br />
                            <h3>Customer last name:</h3> <h5>{customer.lastName}</h5>
                            <br />
                            <h3>Customer email:</h3> <h5>{customer.email}</h5>
                            <br />
                            <h3>Customer Password:</h3> <h5>{customer.password}</h5>
                            <br />
                            <Button onClick={onClickFindAnotherCustomer}>Find another customer</Button>

                        </li>
                    </ul>
                }
            </Card>
        </Fragment>

    )
}


export default GetOneCustomer;