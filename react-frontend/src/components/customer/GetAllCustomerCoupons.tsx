import { Box, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'
import { red } from '@mui/material/colors';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import MessageModal from '../UI/MessageModal';
import './Customer.css'


const GetAllCustomerCoupons = () => {

    const [pageSize, setPageSize] = useState(10)

    const columns = useMemo(() => [
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


    const customerIdFromLogin = useSelector<RootState>(state => state.authRedux.customerIdAfterLogin);

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const [customerCoupons, setCustomerCoupons] = useState(null)


    const getCustomerCoupons = async () => {
        try {

            // console.log(customerIdFromLogin)
            const response1 = await fetch("https://doron-coupon-web-app.herokuapp.com/CouponApp/findCustomerCoupons/" + customerIdFromLogin)
            const response2 = response1.clone();
            const responseFromGetAllCoupons = await response1.text();

            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetAllCoupons })
                throw new Error(responseFromGetAllCoupons) // throwing error to stop code to continue and making error
            }

            //if it pass the first "IF" - then:
            const data = await response2.json();
            setCustomerCoupons(data);
            console.log("Got coupons: " + JSON.stringify(data))
        }


        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }


    useEffect(() => {
        getCustomerCoupons();
    }, []
    )


    return (
        <Fragment>
            {messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmHandler} />}


            {customerCoupons != null &&

                <div className='card'>
                    < Box
                        sx={{
                            height: 'auto',
                            width: '100%'
                        }
                        }>



                        {customerCoupons != null &&
                            <><h4>All Coupons</h4><DataGrid
                                autoHeight

                                showCellRightBorder
                                showColumnRightBorder
                                disableSelectionOnClick
                                disableExtendRowFullWidth

                                columns={columns}
                                rows={customerCoupons}
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
                                    borderRadius: '15px'
                                }} /></>
                        }
                    </Box >
                </div>

            }
        </Fragment>
    )
}


export default GetAllCustomerCoupons;