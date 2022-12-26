import { Box, Tooltip } from '@mui/material';
import { red } from '@mui/material/colors';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Fragment, useMemo, useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'


const GetOneCompany = () => {

    //company ID
    const companyIdRef = useRef<HTMLInputElement>();

    //popup message
    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    //company
    const [company, setCompany] = useState(null)

    //company coupons
    const [companiesCoupons, setCompaniesCoupons] = useState(null)


    //Data Grid
    const [pageSize, setPageSize] = useState(10)

    //company columns
    const companyColumns = useMemo(() => [
        { field: 'id', headerName: 'Id', width: 35 },
        { field: 'name', headerName: 'Name', width: 120, flex: 1 },
        { field: 'email', headerName: 'Email', width: 120, flex: 1 },
        { field: 'password', headerName: 'Password', width: 120, flex: 1 },
    ], [])

    //company coupons columns
    const couponsColumns = useMemo(() => [
        { field: 'id', headerName: 'Id', width: 35 },

        {
            field: 'title', headerName: 'Title', width: 70, flex: 0.6,
            renderCell: (params: GridCellParams) => (
                <Tooltip title={<h2>{params.row.title}</h2>} >
                    <span className="table-cell-trucate">{params.row.title}</span>
                </Tooltip>)
        },

        { field: 'category', headerName: 'Category', width: 80, flex: 0.4 },
        { field: 'price', headerName: 'Price', width: 60, flex: 0.3 },
        { field: 'amount', headerName: 'Amount', width: 60, flex: 0.3 },
        { field: 'startDate', headerName: 'Start Date', width: 60, flex: 0.6 },
        { field: 'endDate', headerName: 'End Date', width: 60, flex: 0.6 },

        {
            field: 'image', headerName: 'Image', width: 150, flex: 1,
            renderCell: (params: GridCellParams) => (
                <img width='100%' src={params.row.image} />
            )
        },

        {
            field: 'description', headerName: 'Description', width: 200, flex: 1,
            renderCell: (params: GridCellParams) => (
                <Tooltip title={<h2>{params.row.description}</h2>} >
                    <span className="table-cell-trucate">{params.row.description}</span>
                </Tooltip>)
        },
    ], [])



    const getCompanyHandler = async (event) => {
        event.preventDefault();

        try {

            console.log("GetCompany " + companyIdRef.current.value)


            //check the input
            if (companyIdRef.current.value.trim().length === 0) {
                setMessageState({ title: "Invalid input", message: "Please enter a valid Company ID (No empty values)" })
                return;
            }

            //java server side
            const response1 = await fetch("http://localhost:8080/CouponApp/findCompanyById/" + companyIdRef.current.value);

            //cloning case - to use the response (we cant use the response twice, so I cloned the response.)
            const response2 = response1.clone();

            //using the first response from the server - to text
            const responseFromGetCompany = await response1.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetCompany })
                throw new Error(responseFromGetCompany) // throwing error to stop code to continue and making error
            }

            //if success (response status !== 400)
            //using the cloned response to .json the data
            const data = await response2.json();
            setCompany(data);
            console.log("Got company: " + JSON.stringify(data))

            getCouponsHandler();
        }


        catch (error) {
            console.log("catching: " + error.message)
        }
    }



    const getCouponsHandler = async () => {

        try {

            console.log("GetCoupons " + companyIdRef.current.value)

            const response1 = await fetch("http://localhost:8080/CouponApp/findCompanyCouponsByCompanyId/" + companyIdRef.current.value)
            const response2 = response1.clone();
            const responseFromGetAllCoupons = await response2.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetAllCoupons })
                throw new Error(responseFromGetAllCoupons) // throwing error to stop code to continue and making error
            }

            //if it pass the first "IF" - then:
            const data = await response1.json();
            setCompaniesCoupons(data);
            console.log("Got coupons: " + JSON.stringify(responseFromGetAllCoupons))
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
            {messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmHandler} />
            }

            <Card>
                <form onSubmit={getCompanyHandler}>
                    <label className='label'>Company ID</label>
                    <input className='input' type="number" ref={companyIdRef} />
                    <br />
                    <Button type="submit">Get Company</Button>
                </form>
            </Card>


            {company &&
                <div className='card'>
                    <Box
                        sx={{
                            height: 'auto',
                            width: 'auto',
                        }
                        }>

                        <h4>Company by ID</h4>

                        <DataGrid
                            autoHeight
                            showCellRightBorder
                            showColumnRightBorder
                            disableExtendRowFullWidth
                            disableSelectionOnClick
                            columns={companyColumns}
                            rows={company}
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
                            }} />

                        <br />

                        {companiesCoupons &&
                            <><h4>Company coupons</h4><DataGrid
                                autoHeight
                                showCellRightBorder
                                showColumnRightBorder
                                disableExtendRowFullWidth
                                disableSelectionOnClick
                                columns={couponsColumns}
                                rows={companiesCoupons}
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
                                }} /></>
                        }
                    </Box >
                </div>
            }
        </Fragment>
    )
}


export default GetOneCompany;