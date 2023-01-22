import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authRedux";




type Props = {

}


export const Logout = (props) => {



    // localStorage.setItem('isLogged', '0');
    // localStorage.removeItem('isLogged')
    localStorage.clear();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {


        dispatch(authActions.setIsAuthFalse())
        dispatch(authActions.setClientTypeNull())
        navigate("/home")
        window.location.reload();
    },
    )


    return (
        <Fragment>
        </Fragment>
    )
}


export default Logout;