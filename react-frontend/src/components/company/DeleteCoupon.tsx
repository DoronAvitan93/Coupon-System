
import { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Company.css'

type Props = {

}


const DeleteCoupon = (props) => {

    const companyIdFromLogin = useSelector<RootState>(state => state.authRedux.companyIdAfterLogin);

    const couponIdRef = useRef<HTMLInputElement>();//coupon ID to update

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const deleteCoupon = async (event) => {
        try {

            event.preventDefault()

            console.log("Coupon ID to delete: " + couponIdRef.current.value)


            const requestOptions =
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            }

            const response = await fetch("http://localhost:8080/CouponApp/deleteCouponById/" + couponIdRef.current.value + "/" + companyIdFromLogin, requestOptions);

            const responseFromDeleteCoupon = await response.text();

            if (response.status === 400) { //BAD REQUEST
                console.log("Coupon by ID given to delete: " + couponIdRef.current.value)
                setMessageState({ title: "Oops! something went wrong!", message: responseFromDeleteCoupon })
                //response from controller
                throw new Error(responseFromDeleteCoupon)
            }

            setMessageState({ title: "Coupon has been deleted!", message: "Coupon has been deleted from the system successfully!" })
            console.log(responseFromDeleteCoupon);

            // restart values
            couponIdRef.current.value = ''
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
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}


                <form onSubmit={deleteCoupon}>

                    <label className='label'>Coupon ID</label>
                    <input className='input' type="text" ref={couponIdRef} />
                    <br />

                    <Button type="submit">Delete coupon</Button>
                </form>
            </Card>
        </Fragment>
    )
}


export default DeleteCoupon;