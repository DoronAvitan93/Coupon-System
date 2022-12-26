
import { Fragment, useState } from 'react';

import MessageModal from '../UI/MessageModal';
import GetAllCompanyCoupons from './GetAllCompanyCoupons';
import GetCompanyCouponsByPrice from './GetCompanyCouponsByPrice';
import GetCompnayCouponsCategory from './GetCompanyCouponsCategory';
import './Company.css'
import Button from '../UI/Button';
import Card from '../UI/Card';



const GetCompanyCouponsOptions = () => {


    const [categoryCouponState, setCategoryCouponState] = useState(null);
    const [isShowCouponsCategory, setIsShowCouponsCategory] = useState(false);

    const [priceState, setPriceState] = useState(0);
    const [isShowCouponsPrice, setIsShowCouponsPrice] = useState(false);

    const [getCouponsByOption, setGetCouponsByOption] = useState("");

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const onMessageConfirmHandler = () => {
        setMessageState(null);
    }


    const selectGetByOptionCouponsHandler = (event) => {
        setGetCouponsByOption(event.target.value)
        console.log(event.target.value)
        setIsShowCouponsCategory(false)
        setIsShowCouponsPrice(false)

    }


    const onChangeSelect = (event) => {

        setCategoryCouponState(event.target.value)
        setIsShowCouponsCategory(true)
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
                <label className='label'>Show Company Coupons By:</label>
                <select className='input__select' onChange={selectGetByOptionCouponsHandler} >
                    <option selected hidden>Choose option</option>
                    <option value="all">All Coupons</option>
                    <option value="category">Coupons By Category</option>
                    <option value="price">Coupons By Price</option>
                </select>
                <br />

                {getCouponsByOption === "category" &&

                    <><label className='label'>Coupon category </label><select className='input__select' onChange={onChangeSelect}>
                        <option selected hidden>Choose Category</option>
                        <option value="FOOD">Food</option>
                        <option value="ELECTRICITY">Electricity</option>
                        <option value="RESTAURANT">Restaurant</option>
                        <option value="VACATION">Vacation</option>
                    </select><br /></>

                }

                {getCouponsByOption === "price" &&
                    <>
                        <label className='label'>Coupon max price</label>
                        <input className='input__ClientType' type="number" min='0' value={priceState} onChange={onChangePriceGet} />
                        <br />
                        <Button onClick={onClickToIsShow}>Get Coupon!</Button>
                        <br />


                    </>
                }
            </Card>

            {getCouponsByOption === "all" && <GetAllCompanyCoupons />}

            {categoryCouponState && isShowCouponsCategory && < GetCompnayCouponsCategory categoryCoupon={categoryCouponState} />}

            {isShowCouponsPrice && <GetCompanyCouponsByPrice priceState={priceState} />}



        </Fragment >
    )
}


export default GetCompanyCouponsOptions;