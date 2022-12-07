
import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Company.css'

type Props = {

}


const GetCompanyDetails = (props) => {

    const companyIdFromLogin = useSelector<RootState>(state => state.authRedux.companyIdAfterLogin);

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const [companyDetails, setCompanyDetails] = useState(null)


    const getCompanyDetailsHandler = async () => {
        try {

            const response1 = await fetch("http://localhost:8080/CouponApp/getCompanyDetailsById/" + companyIdFromLogin)
            const response2 = response1.clone();
            const responseFromCompanyDetails = await response1.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromCompanyDetails })
                throw new Error(responseFromCompanyDetails) // throwing error to stop code to continue and making error
            }

            //if it pass the first "IF" - then:
            const data = await response2.json();
            setCompanyDetails(data);
            console.log("Got company details: " + JSON.stringify(data))
        }


        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }


    useEffect(() => {
        getCompanyDetailsHandler();
    }, [props.categoryCoupon]
    )


    return (
        <Fragment>
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}

                {companyDetails != null &&
                    <ul className='list'>
                        <li>
                            <h1>Company details:</h1>
                            <h3>Company ID: {companyDetails.id}</h3>
                            <h3>Name: {companyDetails.name}</h3>
                            <h3>E-Mail: {companyDetails.email}</h3>
                            <h3>Password: {companyDetails.password}</h3>
                            <br />
                        </li>
                    </ul >}
            </Card>
        </Fragment >
    )
}


export default GetCompanyDetails;