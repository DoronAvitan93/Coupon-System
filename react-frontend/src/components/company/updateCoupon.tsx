
import { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Company.css'



const UpdateCoupon = () => {

    const companyIdFromLogin = useSelector<RootState>(state => state.authRedux.companyIdAfterLogin);

    const couponIdRef = useRef<HTMLInputElement>();//coupon ID to update
    const titleRef = useRef<HTMLInputElement>(); //title to update
    const categoryRef = useRef<HTMLSelectElement>(); //category to update
    const descriptionRef = useRef<HTMLInputElement>(); //description to update
    const amountRef = useRef<HTMLInputElement>(); //amount to update
    const priceRef = useRef<HTMLInputElement>(); //price to update
    const startDateRef = useRef<HTMLInputElement>(); //startDate to update
    const endDateRef = useRef<HTMLInputElement>(); //endDate to update
    const imageRef = useRef<HTMLInputElement>(); //imageRef to update


    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const updateCompanyHandler = async (event) => {
        try {
            event.preventDefault()

            // check the inputs 
            if (couponIdRef.current.value.trim().length === 0 ||
                titleRef.current.value.trim().length === 0 ||
                categoryRef.current.value.trim().length === 0 ||
                descriptionRef.current.value.trim().length === 0 ||
                amountRef.current.value.trim().length === 0 ||
                priceRef.current.value.trim().length === 0 ||
                startDateRef.current.value.trim().length === 0 ||
                endDateRef.current.value.trim().length === 0 ||
                imageRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter a valid inputs value! (No empty values)" });
                return;
            }

            console.log("Coupon ID to update: " + couponIdRef.current.value)
            console.log("updating title: " + titleRef.current.value)
            console.log("updating category: " + categoryRef.current.value)
            console.log("updating description: " + descriptionRef.current.value)
            console.log("updating amount: " + amountRef.current.value)
            console.log("updating price: " + priceRef.current.value)
            console.log("updating startDate: " + startDateRef.current.value)
            console.log("updating endDate: " + endDateRef.current.value)
            console.log("updating image: " + imageRef.current.value)


            const dataToSend = {
                id: couponIdRef.current.value,
                title: titleRef.current.value,
                category: categoryRef.current.value,
                description: descriptionRef.current.value,
                amount: amountRef.current.value,
                price: priceRef.current.value,
                startDate: startDateRef.current.value,
                endDate: endDateRef.current.value,
                image: imageRef.current.value,
                company: {
                    id: companyIdFromLogin,
                }
            }


            const requestOptions =
            {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            }

            const response = await fetch("http://localhost:8080/CouponApp/updateCoupon/", requestOptions);

            const responseFromUpdateCoupon = await response.text();

            if (response.status === 400) { //BAD REQUEST
                console.log("Coupon by ID given to update: " + couponIdRef.current.value)
                setMessageState({ title: "Oops! something went wrong!", message: responseFromUpdateCoupon })
                //response from controller
                throw new Error(responseFromUpdateCoupon)
            }

            setMessageState({ title: "Coupon has been updated!", message: "Coupon has been updated successfully!" })
            console.log(responseFromUpdateCoupon);

            // restart values
            couponIdRef.current.value = ''
            titleRef.current.value = ''
            categoryRef.current.value = ''
            descriptionRef.current.value = ''
            amountRef.current.value = ''
            priceRef.current.value = ''
            startDateRef.current.value = ''
            endDateRef.current.value = ''
            imageRef.current.value = ''
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

                <form onSubmit={updateCompanyHandler}>

                    <label className='label'>Coupon ID </label>
                    <input className='input' type="number" ref={couponIdRef} />
                    <br />
                    <br />

                    <label className='label'>New title </label>
                    <input className='input' type="text" ref={titleRef} />
                    <br />

                    <label className='label'>New category </label>
                    <select className='input__select' ref={categoryRef}>
                        <option hidden>Choose category</option>
                        <option value="FOOD">Food</option>
                        <option value="ELECTRICITY">Electricity</option>
                        <option value="RESTAURANT">Restaurant</option>
                        <option value="VACATION">Vacation</option>
                    </select>
                    <br />

                    <label className='label'>New description </label>
                    <input className='input' type="text" ref={descriptionRef} />
                    <br />

                    <label className='label'>New amount </label>
                    <input className='input' type="number" ref={amountRef} />
                    <br />

                    <label className='label'>New price </label>
                    <input className='input' type="number" ref={priceRef} />
                    <br />

                    <label className='label'>New start-date </label>
                    <input className='input' type="date" ref={startDateRef} />
                    <br />

                    <label className='label'>New end-date </label>
                    <input className='input' type="date" ref={endDateRef} />
                    <br />

                    <label className='label'>New image </label>
                    <input className='input' type="text" ref={imageRef} />
                    <br />
                    <Button type="submit">Update coupon</Button>
                </form>
            </Card>

        </Fragment>
    )
}


export default UpdateCoupon;