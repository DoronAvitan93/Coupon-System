import { Fragment } from 'react';

import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import './Footer.css'
import Card from '../UI/Card';


type Props = {

}


const Footer = (props) => {




    return (
        <Fragment >

            <Card>
                <div className='footer'>
                    <div className='socialMedia'>
                        <InstagramIcon />
                        <LinkedInIcon />
                    </div>



                    <p>
                        &copy; 2022 Doron & Guy Avitan
                    </p>
                </div>
            </Card>

        </Fragment>
    );
};

export default Footer;
