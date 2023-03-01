
// import AuthContext from '../../store/auth-context';
import { NavLink } from 'react-router-dom';
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import Nav from '../UI/Nav';
import './Navigation.css'



const Navigation: React.FC = () => {

  const isAuth = useSelector<RootState>(state => state.authRedux.isAuthenticated);


  return (
    <Fragment>
      <div className='header__nav'>
        <div className='nav-navbar'>
          <Nav >
            <p className='Demo-Coupon-System'>Demo Coupon System</p>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/about'>About</NavLink>
            {isAuth &&
              <NavLink to='/logout'>Logout</NavLink>
            }
          </Nav>
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
