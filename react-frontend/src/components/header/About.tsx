import { Fragment } from 'react';
import './About.css'



const About = () => {





    return (
        <Fragment >
            <div className='about-container'>
                <h1 className='about-header'>Welcome !</h1>
                <h2 className='about-text'>Hello, my name is Doron, I'm full stack graduate with experience in:</h2>
                <h3 className='about-text'> Java, Spring Framework, SpringMVC, JPA, mySQL, HTML, CSS, Java script, TypeScript, React.</h3>
                <h3 className='about-text'>My project - Coupon system, is a web app for both customers and companies.</h3>
                <h3 className='about-text'>Coupon system is built with Java + Spring Framework for the backeEnd, MySql for the DB and ReactJS for the frontEnd </h3>
                <br />


                <img className='logo-react' width='60px' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React logo" />
                <img className='logo-spring' width='100px' src="https://w7.pngwing.com/pngs/713/936/png-transparent-spring-framework-representational-state-transfer-java-api-for-restful-web-services-microservices-others-text-trademark-logo.png" alt="Spring logo" />
                <img className='logo-mysql' width='100px' src="https://cdn.freebiesupply.com/logos/large/2x/mysql-logo-svg-vector.svg" alt="mysql logo" />

                <p className='about-text'>I'm constantly learning new things, currently those things include gaining more experience.</p>
                <p className='about-text'>I carry out each project I engage in with MOTIVATION & DEDICATION, always striving to deliver my work on the highest standards</p>
                <p className='about-text'> i have a very high self-study ability with a passion to learn and succeed.</p>
            </div>
        </Fragment >
    );
};


export default About;
