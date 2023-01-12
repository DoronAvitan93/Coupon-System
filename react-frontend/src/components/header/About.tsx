import { Fragment } from 'react';
import './About.css'



const About = () => {


    return (
        <Fragment >
            <div className='about-container'>
                <h1 className='about-header'>Welcome !</h1>
                <h2 className='about-text'>My name is Doron, I'm full stack graduate from JohnBryce with experience in:</h2>
                <h3 className='about-text'>Java, Spring Framework, SpringMVC , Hibernate, JPA , MySql, HTML, CSS, Java Script, TypeScript, React, Redux, Git, GitHub, ChatGPT.</h3>
                <h3 className='about-text'>My project - Coupon system, is a web app for both customers and companies.</h3>
                <br />

                <img className='logo-react' width='60px' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React logo" />
                <img className='logo-spring' width='100px' src="https://w7.pngwing.com/pngs/713/936/png-transparent-spring-framework-representational-state-transfer-java-api-for-restful-web-services-microservices-others-text-trademark-logo.png" alt="Spring logo" />
                <img className='logo-mysql' width='100px' src="https://cdn.freebiesupply.com/logos/large/2x/mysql-logo-svg-vector.svg" alt="mysql logo" />

                <h2 className='about-text'>I am an experienced computer user with advanced skills in fast and accurate typing, including blind typing.</h2>
                <h2 className='about-text'>I have a strong aptitude for self-learning and am able to quickly adapt to new technologies and systems.</h2>
                <h2 className='about-text'>I am highly skilled in using Google to search for and find information.</h2>
                <h2 className='about-text'>I am highly skilled in using Google to search for and find information.</h2>
                <h2 className='about-text'>I am comfortable working independently or as part of a team, and my ability to solve problems and learn new things efficiently,</h2>
                <h2 className='about-text'>combined with my passion for computer use, makes me a valuable asset in any team.</h2>
            </div>
        </Fragment >
    );
};


export default About;
