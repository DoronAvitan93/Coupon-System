import { Fragment } from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css'



const Footer = () => {



    return (
        <Fragment >
            <div className='footer'>
                <div className='socialMedia'>
                    <a href="https://www.instagram.com/doron_avitan/"><InstagramIcon /></a>
                    <a href="https://www.linkedin.com/in/doron-avitan/"><LinkedInIcon /></a>
                    <a href="https://github.com/DoronAvitan93"><GitHubIcon /></a>
                </div>
                <p>
                    &copy; 2022 Doron Avitan
                </p>
            </div>
        </Fragment>
    );
};

export default Footer;
