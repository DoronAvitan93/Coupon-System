
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Fragment, useEffect, useMemo, useState } from 'react';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'

type Props = {

}


const GetAllCustomers = (props) => {

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const [customers, setCustomers] = useState(null)

    //Data Grid
    const [pageSize, setPageSize] = useState(10)

    const columns = useMemo(() => [
        { field: 'id', headerName: 'Id', width: 50, flex: 1 },
        { field: 'firstName', headerName: 'First Name', width: 120, flex: 1 },
        { field: 'lastName', headerName: 'First Name', width: 120, flex: 1 },
        { field: 'email', headerName: 'Email', width: 200, flex: 1 },
        { field: 'password', headerName: 'Password', width: 150, flex: 1 }
    ], [])



    const getCompaniesHandler = async () => {
        try {

            const response1 = await fetch("http://localhost:8080/CouponApp/getAllCustomers")
            const response2 = response1.clone();
            const responseFromGetAllCustomers = await response1.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetAllCustomers })
                throw new Error(responseFromGetAllCustomers) // throwing error to stop code to continue and making error
            }

            //if it pass the first "IF" - then:
            const data = await response2.json();
            setCustomers(data);
            console.log("Got customers: " + JSON.stringify(data))


            // console.log("Response from GetAllCustomers: " + responseFromGetAllCustomers)
            // setMessageState({ title: "Got all customers!", message: "WORK, CHANGE LATER" })

        }


        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }


    useEffect(() => {
        getCompaniesHandler();
    }, []
    )


    return (
        <Fragment>
            <Card>

                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}



                < Box
                    sx={{
                        height: 'auto',
                        width: '100%',
                    }
                    }>

                    <Typography
                        variant='h3'
                        component='h3'
                        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                    >
                        All Customers
                    </Typography>


                    {customers != null &&

                        <DataGrid
                            autoHeight
                            showCellRightBorder
                            showColumnRightBorder
                            disableExtendRowFullWidth
                            columns={columns}
                            rows={customers}
                            getRowId={row => row.id}
                            rowsPerPageOptions={[10, 20, 30]}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            getRowSpacing={params => ({
                                top: params.isFirstVisible ? 0 : 5,
                                bottom: params.isLastVisible ? 0 : 5,
                            })}
                            sx={{
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: theme => theme.palette.mode === 'light' ? grey[200] : grey[900],
                                }
                            }}
                        />
                    }
                </Box >
            </Card>
        </Fragment>
    )
}


export default GetAllCustomers;

