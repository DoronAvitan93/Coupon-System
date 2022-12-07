
// import AuthContext from '../../store/auth-context';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reduxIndex';
import Nav from '../UI/Nav';
import './Navigation.css'


type Props = {

}

const Navigation: React.FC<Props> = (props) => {

  const isAuth = useSelector<RootState>(state => state.authRedux.isAuthenticated);


  return (
    <div className='Nav'>
      {/* was here ul and li 01/12 */}
      <Nav >

        <NavLink to='/'>Home</NavLink>



        <NavLink to='/about'>About</NavLink>


        {isAuth &&

          <NavLink to='/logout'>Logout</NavLink>
        }

      </Nav>

    </div>

  );
};

export default Navigation;
