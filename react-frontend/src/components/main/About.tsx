import { Fragment } from 'react';
import './About.css'



const About = () => {


    return (
        <Fragment >
            <div className='background'>


                <div className='about-container'>
                    <p className='about-header'>Welcome !</p>
                    <p className='about-text'></p>
                    <p className='about-text'>My name is Doron <br />My project - Coupon system,<br /> is a web app for both customers and companies.</p>
                    <br />

                    <a className='github__repository' href="https://github.com/DoronAvitan93/Coupon-System"><i className="fa-brands fa-github"></i> GitHub Repository</a>
                    <hr className='hr__github' />

                    <img className='logo-react' width='60px' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React logo" />
                    <img className='logo-spring' width='100px' src="https://w7.pngwing.com/pngs/713/936/png-transparent-spring-framework-representational-state-transfer-java-api-for-restful-web-services-microservices-others-text-trademark-logo.png" alt="Spring logo" />
                    <img className='logo-mysql' width='100px' src="https://cdn.freebiesupply.com/logos/large/2x/mysql-logo-svg-vector.svg" alt="mysql logo" />
                    <br />


                </div>
            </div>
        </Fragment >
    );
};


export default About;
