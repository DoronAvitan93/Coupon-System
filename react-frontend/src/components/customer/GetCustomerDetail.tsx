import { Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';
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

    const customerColumns = useMemo(() => [
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
            {messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmHandler} />}

            {customerDetails &&
                <div className='card'>
                    <Box
                        sx={{
                            height: 'auto',
                            width: 'auto',
                        }
                        }>

                        <h4>Customer details</h4>

                        <DataGrid
                            autoHeight
                            showCellRightBorder
                            showColumnRightBorder
                            disableExtendRowFullWidth
                            disableSelectionOnClick
                            columns={customerColumns}
                            rows={customerDetails}
                            getRowId={row => row.id}
                            // rowsPerPageOptions={[10,20.30]}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            getRowSpacing={params => ({
                                top: params.isFirstVisible ? 0 : 5,
                                bottom: params.isLastVisible ? 0 : 5,
                            })}
                            sx={{
                                "& .MuiDataGrid-row:hover": {
                                    backgroundColor: red[100],
                                },
                                backgroundColor: '#ffe5e5',
                                borderRadius: '15px'
                            }} />

                        <br />

                    </Box >
                </div>
            }
        </Fragment >
    )
}


export default GetCustomerDetails;