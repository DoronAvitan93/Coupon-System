import { Box } from '@mui/material';
import { red } from '@mui/material/colors';
import { DataGrid } from '@mui/x-data-grid';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import MessageModal from '../UI/MessageModal';
import './Company.css'


const GetCompanyDetails = () => {

    const companyIdFromLogin = useSelector<RootState>(state => state.authRedux.companyIdAfterLogin);

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const [companyDetails, setCompanyDetails] = useState(null)

    //Data Grid
    const [pageSize, setPageSize] = useState(10)

    //company columns
    const companyColumns = useMemo(() => [
        { field: 'id', headerName: 'Id', width: 35 },
        { field: 'name', headerName: 'Name', width: 120, flex: 1 },
        { field: 'email', headerName: 'Email', width: 120, flex: 1 },
        { field: 'password', headerName: 'Password', width: 120, flex: 1 },
    ], [])


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
    }, []
    )


    return (
        <Fragment>

            {messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmHandler} />}


            {companyDetails &&
                <div className='card'>
                    <Box
                        sx={{
                            height: 'auto',
                            width: 'auto',
                        }
                        }>

                        <h4>Company details</h4>

                        <DataGrid
                            autoHeight
                            showCellRightBorder
                            showColumnRightBorder
                            disableExtendRowFullWidth
                            disableSelectionOnClick
                            columns={companyColumns}
                            rows={companyDetails}
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


export default GetCompanyDetails;