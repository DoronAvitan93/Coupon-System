
import { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Company.css'




const AddCoupon = () => {


    //user client type: Customer / Client
    // const selectUserTypeRef = useRef<HTMLSelectElement>(); //register clientType

    const companyIdFromLogin = useSelector<RootState>(state => state.authRedux.companyIdAfterLogin);

    const titleRef = useRef<HTMLInputElement>(); //coupon title
    const categoryRef = useRef<HTMLSelectElement>(); //coupon category
    const descriptionRef = useRef<HTMLInputElement>(); //coupon description
    const amountRef = useRef<HTMLInputElement>(); //coupon amount
    const priceRef = useRef<HTMLInputElement>(); //coupon price
    const startDateRef = useRef<HTMLInputElement>(); //coupon startDate
    const endDateRef = useRef<HTMLInputElement>();//coupon endDate
    const imageUrlRef = useRef<HTMLInputElement>(); //coupon imageUrl

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const addCoupon = async (event) => {
        try {
            console.log(companyIdFromLogin)
            event.preventDefault();
            //check the inputs 
            if (categoryRef.current.value.trim().length === 0 ||
                titleRef.current.value.trim().length === 0 ||
                descriptionRef.current.value.trim().length === 0 ||
                startDateRef.current.value.trim().length === 0 ||
                endDateRef.current.value.trim().length === 0 ||
                amountRef.current.value.trim().length === 0 ||
                priceRef.current.value.trim().length === 0 ||
                imageUrlRef.current.value.trim().length === 0) {

                setMessageState({ title: "Invalid input", message: "Please enter a valid inputs (No empty values)" })
                return;
            }

            const dataToSend = {
                //coupon
                title: titleRef.current.value,
                category: categoryRef.current.value,
                description: descriptionRef.current.value,
                amount: amountRef.current.value,
                price: priceRef.current.value,
                startDate: startDateRef.current.value,
                endDate: endDateRef.current.value,
                image: imageUrlRef.current.value,
                company: {
                    id: companyIdFromLogin,
                }
            }

            const requestOptions =
            {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend)
            }

            const response = await fetch("https://doron-coupon-web-app.herokuapp.com/CouponApp/addCoupon", requestOptions)

            const responseFromDbAfterAddingCoupon = await response.text();
            console.log(responseFromDbAfterAddingCoupon)

            if (response.status === 400) { //BAD REQUEST
                setMessageState({ title: "Coupon already exist!", message: "Please try different Title" })
                //response from controller
                throw new Error(responseFromDbAfterAddingCoupon)
            }

            //response from controller with details if OK
            console.log(responseFromDbAfterAddingCoupon)

            setMessageState({ title: "Coupon added successfully!", message: "You have been added coupon to Coupon system!" })


            //restart values
            // titleRef.current.value = ''
            // categoryRef.current.value = ''
            // descriptionRef.current.value = ''
            // amountRef.current.value = ''
            // priceRef.current.value = ''
            // startDateRef.current.value = ''
            // endDateRef.current.value = ''
            // imageUrlRef.current.value = ''


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
            <Card>
                {messageState &&
                    <MessageModal title={messageState.title}
                        message={messageState.message}
                        onConfirm={onMessageConfirmHandler} />}


                <form onSubmit={addCoupon}>
                    <label className='label'>Coupon title</label>
                    <input className='input' type="text" ref={titleRef} />
                    <br />

                    <label className='label'>Coupon category</label>
                    <select className='input__select' ref={categoryRef}>
                        <option value="FOOD">Food</option>
                        <option value="ELECTRICITY">Electricity</option>
                        <option value="RESTAURANT">Restaurant</option>
                        <option value="VACATION">Vacation</option>
                    </select>
                    <br />

                    <label className='label'>Coupon description</label>
                    <input className='input' type="text" ref={descriptionRef} />
                    <br />

                    <label className='label'>Coupon amount</label>
                    <input className='input' type="number" ref={amountRef} />
                    <br />

                    <label className='label'>Coupon price</label>
                    <input className='input' type="number" ref={priceRef} />
                    <br />

                    <label className='label' >Coupon start-date</label>
                    <input className='input' type="date" ref={startDateRef} />
                    <br />

                    <label className='label' >Coupon end-date</label>
                    <input className='input' type="date" ref={endDateRef} />
                    <br />

                    <label className='label'>Coupon image</label>
                    <input className='input' type="text" ref={imageUrlRef} />
                    <br />

                    <Button type="submit">Add Coupon!</Button>
                </form>
            </Card>
        </Fragment >
    )
}


export default AddCoupon;
