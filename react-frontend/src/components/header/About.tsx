import { Fragment } from 'react';
import './About.css'



const About = () => {


    return (
        <Fragment >
            <div className='about-container'>
                <h1 className='about-header'>Welcome !</h1>
                <h2 className='about-text'>My name is Doron, I'm full stack graduate from John Bryce Academy</h2>
                <h3 className='about-text'>My project - Coupon system, is a web app for both customers and companies.</h3>


                <br />

                <img className='logo-react' width='60px' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React logo" />
                <img className='logo-spring' width='100px' src="https://w7.pngwing.com/pngs/713/936/png-transparent-spring-framework-representational-state-transfer-java-api-for-restful-web-services-microservices-others-text-trademark-logo.png" alt="Spring logo" />
                <img className='logo-mysql' width='100px' src="https://cdn.freebiesupply.com/logos/large/2x/mysql-logo-svg-vector.svg" alt="mysql logo" />

                <h3 className='about-text' >Experience:</h3>

                <h2 className='about-text'>Java: Basic Java, Object Oriented Analysis & Design, Expressions & Flow Control,<br /> Arrays, Class Design, Exceptions, Collections, Threads, JDBC, SQL, Java 8 & Functional Programming.</h2>
                <h3 className='about-text' >Server side: Spring Framework, Advanced Spring, SpringMVC, Hibernate / JPA.</h3>
                <h3 className='about-text' >Web: SpringMVC, HTML & CSS, JavaScript, TypeScript, ReactJS, React Redux, React Router, Web Services - REST.</h3>
                <h3 className='about-text' >Databases: MySql, clearDB</h3>
                <h3 className='about-text' >Cloud services: Heroku, FireBase</h3>
                <h3 className='about-text' >Development Environment: Intellij, Visual Studio Code</h3>
                <h3 className='about-text' >Version control: Git & GitHub </h3>
                <br />
                <h3 className='about-text'>👇</h3>
                <h3 className='about-text'>Passionate about personal and professional growth,<br /> constantly seeking new opportunities to learn and challenge myself to reach new heights. 🚀</h3>
                <h3 className='about-text'>Fueled by a passion for coding and a love of learning, <br />constantly seeking new and innovative ways to solve problems and improve my skills. 🕵️</h3>
                <h3 className='about-text'>Proficient in computer use with a fast operating ability. 💻</h3>
                <h3 className='about-text'>Possessing valuable skills and a strong work ethic,<br /> eager to join a team where I can contribute and continue to grow,<br /> while being part of a collaborative and successful environment. 🙏</h3>
                <h3 className='about-text'>👆</h3>
            </div>
        </Fragment >
    );
};


export default About;
