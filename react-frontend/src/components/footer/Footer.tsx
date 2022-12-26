import { Fragment } from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css'



const Footer = () => {




    return (
        <Fragment >

            <div className='footer'>
                <div className='socialMedia'>
                    <InstagramIcon />
                    <LinkedInIcon />
                </div>

                <p>
                    &copy; 2022 Doron Avitan
                </p>
            </div>


        </Fragment>
    );
};

export default Footer;
