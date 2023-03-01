import { Fragment, useState } from 'react';
import Button from '../UI/Button';

import MessageModal from '../UI/MessageModal';
import GetAllCustomerCoupons from './GetAllCustomerCoupons';
import GetCustomerCouponsByCategory from './GetCustomerCouponsByCategory';
import GetCustomerCouponsByPrice from './GetCustomerCouponsByPrice';
import './Customer.css'
import Card from '../UI/Card';



const GetCustomerCouponsOptions = () => {

    const [categoryCouponState, setCategoryCouponState] = useState(null);

    const [priceState, setPriceState] = useState(0);
    const [isShowCouponsPrice, setIsShowCouponsPrice] = useState(false);

    const [getCouponsByOption, setGetCouponsByOption] = useState("");

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }


    const selectGetByOptionCouponsHandler = (event) => {
        setGetCouponsByOption(event.target.value);
        //restart category value (when change options)
        setCategoryCouponState(null);
        // console.log(event.target.value);

    }


    const onChangeSelect = (event) => {
        event.preventDefault();
        // console.log(event.target.value);
        setCategoryCouponState(event.target.value);
    }


    const onChangePriceGet = (event) => {
        setIsShowCouponsPrice(false)
        setPriceState(event.target.value)
    };


    const onClickToIsShow = () => {
        setIsShowCouponsPrice(true)
    }


    return (
        <Fragment>

            {messageState &&
                <MessageModal title={messageState.title}
                    message={messageState.message}
                    onConfirm={onMessageConfirmHandler} />}

            <Card>
                <label className='label'>Show coupons by:</label>
                <select className='input__select' onChange={selectGetByOptionCouponsHandler} >
                    <option hidden>Choose option</option>
                    <option value="all">All coupons</option>
                    <option value="category">Coupons  by category</option>
                    <option value="price">Coupons by price</option>
                </select>
                <br />



                {getCouponsByOption === "category" &&
                    <>
                        <label className='label'>Coupon category </label>
                        <select className='input__select' onChange={onChangeSelect} >
                            <option hidden>Choose Category</option>
                            <option value="FOOD">Food</option>
                            <option value="ELECTRICITY">Electricity</option>
                            <option value="RESTAURANT">Restaurant</option>
                            <option value="VACATION">Vacation</option>
                        </select>
                        <br />

                    </>
                }

                {getCouponsByOption === "price" &&
                    <>
                        <label className='label'>Coupon max price</label>
                        <input className='input' type="number" min='0' value={priceState} onChange={onChangePriceGet} />
                        <br />
                        <Button onClick={onClickToIsShow}>Get Coupon!</Button>
                        <br />


                    </>
                }
            </Card>

            {getCouponsByOption === "all" && <GetAllCustomerCoupons />}

            {categoryCouponState !== null && <GetCustomerCouponsByCategory categoryCoupon={categoryCouponState} />}

            {isShowCouponsPrice && <GetCustomerCouponsByPrice priceState={priceState} />}


        </Fragment >
    )
}


export default GetCustomerCouponsOptions;