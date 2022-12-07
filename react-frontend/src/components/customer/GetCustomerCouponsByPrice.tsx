import { Box, Tooltip, Typography } from '@mui/material'
import { DataGrid, GridCellParams, gridClasses } from '@mui/x-data-grid'
import { grey } from '@mui/material/colors';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import MessageModal from '../UI/MessageModal';
import './Customer.css'



type Props = {
    priceState: number
}


const GetCompanyCouponsByPrice: React.FC<Props> = (props: Props) => {

    const [pageSize, setPageSize] = useState(10)

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
        }
    ], [])



    const customerIdFromLogin = useSelector<RootState>(state => state.authRedux.customerIdAfterLogin);

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const [customerCoupons, setCustomerCoupons] = useState(null)


    const getCompaniesHandler = async () => {
        try {

            //fetch all coupons by category

            const response1 = await fetch("http://localhost:8080/CouponApp/findCustomerCouponsWithMaxPrice/" + customerIdFromLogin + "/" + props.priceState)
            const response2 = response1.clone();
            const responseFromGetCouponsByMaxPrice = await response1.text();


            if (response1.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromGetCouponsByMaxPrice })
                throw new Error(responseFromGetCouponsByMaxPrice) // throwing error to stop code to continue and making error
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
        getCompaniesHandler();
    }, [props.priceState]
    )


    return (
        <Fragment>

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
                    Coupons By Price:
                </Typography>


                {customerCoupons != null &&

                    <DataGrid
                        autoHeight
                        showCellRightBorder
                        showColumnRightBorder
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
                            [`& .${gridClasses.row}`]: {
                                bgcolor: theme => theme.palette.mode === 'light' ? grey[200] : grey[900],
                            }
                        }}
                    />
                }
            </Box >

            {messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmHandler} />}

        </Fragment>
    )
}



export default GetCompanyCouponsByPrice;