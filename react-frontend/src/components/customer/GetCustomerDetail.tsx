
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';





const GetCustomerDetails = () => {

    const customerIdAfterLogin = useSelector<RootState>(state => state.authRedux.customerIdAfterLogin);

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const [customerDetails, setCompanyDetails] = useState(null)

    //Data Grid
    const [pageSize, setPageSize] = useState(10)

    const columns = useMemo(() => [
        { field: 'id', headerName: 'ID', width: 35 },
        { field: 'firstName', headerName: 'First Name', width: 120, flex: 1 },
        { field: 'lastName', headerName: 'Last Name', width: 120, flex: 1 },
        { field: 'email', headerName: 'E-Mail', width: 120, flex: 1 },
        { field: 'password', headerName: 'Password', width: 120, flex: 1 },
    ], [])


    const getCustomerDetailsHandler = async () => {
        try {

            const response1 = await fetch("http://localhost:8080/CouponApp/getCustomerDetailsById/" + customerIdAfterLogin)
            const response2 = response1.clone();
            const responseFromCustomeryDetails = await response1.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromCustomeryDetails })
                throw new Error(responseFromCustomeryDetails) // throwing error to stop code to continue and making error
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
        getCustomerDetailsHandler();
    }, []
    )


    return (
        <Fragment>
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}

                {customerDetails != null &&
                    <ul className='list'>
                        <li>
                            <h1>Customer details:</h1>
                            <h3>Customer ID: {customerDetails.id}</h3>
                            <h3>First Name: {customerDetails.firstName}</h3>
                            <h3>Last Name: {customerDetails.lastName}</h3>
                            <h3>E-Mail: {customerDetails.email}</h3>
                            <h3>Password: {customerDetails.password}</h3>
                            <br />
                        </li>
                    </ul >}
            </Card>
        </Fragment >
    )
}


export default GetCustomerDetails;