import React, { Fragment } from 'react';
import Navigation from './Navigation';
import './MainHeader.css'





type Props = {


}

const MainHeader: React.FC<Props> = (props) => {


  return (
    <Fragment>
      <div className='mainHeader'>
        {/* //All the buttons here */}
        <Navigation />
      </div>
    </Fragment>
  );
};


export default MainHeader;