
import { Fragment, useRef, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import MessageModal from '../UI/MessageModal';
import './Admin.css'

type Props = {

}


const DeleteCompany: React.FC<Props> = (props: Props) => {

    const companyIdRef = useRef<HTMLInputElement>();//company ID to update

    const [messageState, setMessageState] = useState<{ title: string, message: string }>(null);


    const updateCompanyHandler = async (event) => {
        try {

            event.preventDefault()

            console.log("Company ID to delete: " + companyIdRef.current.value)




            const requestOptions =
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" },
            }

            const response = await fetch("http://localhost:8080/CouponApp/deleteCompanyById/" + companyIdRef.current.value, requestOptions);

            const responseFromUpdateCompany = await response.text();

            if (response.status === 400) { //BAD REQUEST
                console.log("Company by ID given to delete: " + companyIdRef.current.value)
                setMessageState({ title: "Oops! something went wrong!", message: responseFromUpdateCompany })
                //response from controller
                throw new Error(responseFromUpdateCompany)
            }

            setMessageState({ title: "Company has been deleted!", message: "Company has been deleted from the system successfully!" })
            console.log(responseFromUpdateCompany);

            // restart values
            companyIdRef.current.value = ''
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

                    <label className='label'>Company ID</label>
                    <input className='input' type="text" ref={companyIdRef} />
                    <br />
                    <div>
                        <Button type="submit">Delete company</Button>
                    </div>
                </form>
            </Card>


        </Fragment>
    )
}


export default DeleteCompany;