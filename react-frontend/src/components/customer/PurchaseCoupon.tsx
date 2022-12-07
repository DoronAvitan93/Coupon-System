import { Box, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridCellParams, gridClasses } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors';
import { useState, Fragment, useEffect, useMemo } from "react";
import MessageModal from "../UI/MessageModal";

import CustomerAction from './CustomerAction';
import Card from '../UI/Card';


type Props = {

}


const PurchaseCoupon = (props) => {

    const [pageSize, setPageSize] = useState(10)

    const [rowId, setRowId] = useState(null)

    const columns = useMemo(() => [
        { field: 'id', headerName: 'Id', width: 35, flex: 1 },

        {
            field: 'title', headerName: 'Title', width: 80, flex: 1,
            renderCell: (params: GridCellParams) => (
                <Tooltip title={<h2>{params.row.title}</h2>} >
                    <span className="table-cell-trucate">{params.row.title}</span>
                </Tooltip>)
        },
        { field: 'category', headerName: 'Category', width: 120, flex: 1 },
        { field: 'price', headerName: 'Price', width: 80, flex: 1 },
        { field: 'amount', headerName: 'Amount', width: 80, flex: 1 },
        { field: 'startDate', headerName: 'Start Date', width: 100, flex: 1 },
        { field: 'endDate', headerName: 'End Date', width: 100, flex: 1 },

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
        {
            field: 'actions',
            headerName: 'Purchase',
            renderCell: params => (
                <CustomerAction {...{ params, rowId, setRowId }} />
            )
        }
    ], [rowId])


    const [coupons, setCoupons] = useState(null);

    const [categorySelect, setCategorySelect] = useState(null);

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const getCouponsHandler = async () => {
        try {

            //fetch all coupons by category

            const response1 = await fetch("http://localhost:8080/CouponApp/findAllCouponsByCategory/" + categorySelect)
            const response2 = response1.clone();
            const responseFromGetACouponsByCategory = await response1.text();


            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetACouponsByCategory })
                throw new Error(responseFromGetACouponsByCategory) // throwing error to stop code to continue and making error
            }

            //if it pass the first "IF" - then:
            const data = await response2.json();
            setCoupons(data);
            console.log("Got coupons: " + JSON.stringify(data))

        }

        catch (error) {
            console.log("catching: " + error.message)
        }
    }


    const onChangeSelectHandler = (event) => {
        console.log(event.target.value)
        setCategorySelect(event.target.value)
        console.log(categorySelect)

    }


    useEffect(() => {
        if (categorySelect != null) {
            getCouponsHandler();
            setCoupons(null);
        }
    }, [categorySelect]
    )


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


                <label className='label'>Coupon category </label>
                <select className='input__ClientType' defaultValue={null} onChange={onChangeSelectHandler} >
                    <option hidden>Choose Category</option>
                    <option value="FOOD">Food</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="VACATION">Vacation</option>
                </select>
                <br />

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
                        Coupons By Category:
                    </Typography>


                    {coupons != null &&

                        <DataGrid
                            autoHeight
                            showCellRightBorder
                            showColumnRightBorder
                            disableExtendRowFullWidth
                            columns={columns}
                            rows={coupons}
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
                            onCellClick={params => setRowId(params.id)}
                        />
                    }
                </Box >
            </Card>
        </Fragment >
    )
}

export default PurchaseCoupon;