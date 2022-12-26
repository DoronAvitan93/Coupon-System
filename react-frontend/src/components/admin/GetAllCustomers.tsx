
import { Box, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Fragment, useEffect, useMemo, useState } from 'react';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'


const GetAllCustomers = () => {

    //popup message
    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    //customers
    const [customers, setCustomers] = useState(null)

    //Data Grid
    const [pageSize, setPageSize] = useState(10)

    const columns = useMemo(() => [
        { field: 'id', headerName: 'Id', width: 35 },
        { field: 'firstName', headerName: 'First Name', width: 120, flex: 1 },
        { field: 'lastName', headerName: 'Last Name', width: 120, flex: 1 },
        { field: 'email', headerName: 'Email', width: 200, flex: 1 },
        { field: 'password', headerName: 'Password', width: 150, flex: 1 }
    ], [])



    const getCompaniesHandler = async () => {
        try {

            //java server side
            const response1 = await fetch("http://localhost:8080/CouponApp/getAllCustomers")

            //cloning case - to use the response (we cant use the response twice, so I cloned the response.)
            const response2 = response1.clone();

            //using the first response from the server - to text
            const responseFromGetAllCustomers = await response1.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetAllCustomers })
                throw new Error(responseFromGetAllCustomers) // throwing error to stop code to continue and making error
            }

            //if success (response status !== 400)
            //using the cloned response to .json the data
            const data = await response2.json();
            setCustomers(data);
            // console.log("Got customers: " + JSON.stringify(data))
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
                        width: 'auto',
                    }
                    }>

                    <h4>All Customers</h4>

                    {customers != null &&

                        <DataGrid
                            autoHeight
                            showCellRightBorder
                            showColumnRightBorder
                            disableExtendRowFullWidth
                            disableSelectionOnClick
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
                                "& .MuiDataGrid-row:hover": {
                                    backgroundColor: red[100],
                                },
                                backgroundColor: '#ffe5e5',
                            }}
                        />
                    }
                </Box >
            </Card>
        </Fragment>
    )
}


export default GetAllCustomers;

