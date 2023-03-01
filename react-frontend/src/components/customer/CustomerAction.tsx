import { Box, CircularProgress, Fab } from "@mui/material"
import { Fragment, useState } from 'react';

import { green, yellow } from "@mui/material/colors";
import { Check, Save } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reduxIndex";
import MessageModal from "../UI/MessageModal";



const CustomerAction = ({ params, rowId, setRowId }) => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)


    const customerIdAfterLogin = useSelector<RootState>(state => state.authRedux.customerIdAfterLogin);

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);

    const handleSubmit = async () => {
        console.log(customerIdAfterLogin)
        try {
            //purchase coupon
            const requestOptions =
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
            }


            if (customerIdAfterLogin === '82') { //BAD REQUEST
                setMessageState({ title: "ERROR", message: "As a Guest - You cant purchase coupons!" })
                setLoading(false)
                throw new Error('Error') // throwing error to stop code to continue and making error
            }

            setLoading(true)
            const response = await fetch("https://doron-coupon-web-app.herokuapp.com/CouponApp/purchaseCoupon/" + params.id + "/" + customerIdAfterLogin, requestOptions)
            const responseFromPurchaseCoupon = await response.text();

            if (response.status === 400) { //BAD REQUEST
                setMessageState({ title: "Oops! Something went wrong!", message: responseFromPurchaseCoupon })
                setLoading(false)
                throw new Error(responseFromPurchaseCoupon) // throwing error to stop code to continue and making error

            }

            //response from controller with details if OK
            console.log(responseFromPurchaseCoupon)

            setMessageState({ title: "Coupon purchased successfully!", message: responseFromPurchaseCoupon })
            setLoading(false)
            setSuccess(true)

            //catching error
        } catch (error) {
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
                    onConfirm={onMessageConfirmHandler} />}

            <Box
                sx={{
                    m: 1,
                    position: 'relative'
                }}
            >

                {success ? (
                    <Fab
                        color="primary"
                        sx={{
                            width: 40,
                            height: 40,
                            bgcolor: green[500],
                            '&hover': { bgcolor: green[700] }
                        }}
                    >

                        <Check />
                    </Fab>
                ) : (<Fab
                    color="primary"
                    sx={{
                        width: 40,
                        height: 40,
                    }}
                    disabled={params.id !== rowId || loading}
                    onClick={handleSubmit}
                >
                    <Save />
                </Fab>
                )}
                {loading && (
                    <CircularProgress
                        size={52}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: -6,
                            left: -6,
                            zIndex: 1,
                        }}
                    />
                )}
            </Box>

        </Fragment>
    )
};


export default CustomerAction
