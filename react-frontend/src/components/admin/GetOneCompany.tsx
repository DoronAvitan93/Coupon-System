
import { Fragment, useEffect, useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'

type Props = {

}


const GetOneCompany = (props) => {


    const companyIdRef = useRef<HTMLInputElement>();

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const [company, setCompany] = useState(null)


    const getCompanyHandler = async (event) => {
        try {
            event.preventDefault();

            //check the input
            if (companyIdRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter a valid Company ID (No empty values)" })
                return;
            }

            const response1 = await fetch("http://localhost:8080/CouponApp/findCompanyById/" + companyIdRef.current.value);
            const response2 = response1.clone();
            const responseFromGetCompany = await response1.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetCompany })
                throw new Error(responseFromGetCompany) // throwing error to stop code to continue and making error
            }

            //if it pass the first "IF" - then:
            const data = await response2.json();
            setCompany(data);
            console.log("Got company: " + JSON.stringify(data))


            // console.log("Response from getOneCompany: " + responseFromGetCompany)
            // setMessageState({ title: "Got company!", message: "WORK, CHANGE LATER" })

        }


        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }

    const onClickFindAnotherCompany = () => {
        setCompany(null);
    }



    return (
        <Fragment>
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}

                {!company &&
                    <form onSubmit={getCompanyHandler}>
                        <label className='label'>Company ID</label>
                        <input className='input' type="text" ref={companyIdRef} />
                        <br />

                        <Button type="submit">Get Company</Button>

                    </form>
                }

                {company &&
                    <ul className='list'>
                        <li>
                            <h3>Company Name: {company.name}</h3>
                            <h3>Company Email: {company.email}</h3>
                            <h3>Company Password{company.password}</h3>
                            <h5>Company Coupons:</h5>

                            <button onClick={onClickFindAnotherCompany}>Find another company</button>
                            <br />
                        </li>
                    </ul>
                }
            </Card>
        </Fragment>

    )
}


export default GetOneCompany;