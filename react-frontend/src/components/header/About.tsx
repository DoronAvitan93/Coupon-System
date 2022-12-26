import { Fragment } from 'react';
import Footer from '../footer/Footer';

import Card from '../UI/Card';
import './About.css'



type Props = {

}


const About = (props) => {




    return (
        <Fragment >
            <Card>
                <h1>Welcome !</h1>
                <h2>Hello, my name is Doron, I'm full stack graduate with experience in:</h2>
                <h3> Java, Java SpringBoot, mySql, JavaScript, TypeScript, HTML, CSS, React.</h3>
                <h3>My project - Coupon system, is a web app for companies who want to publish their coupons to customers.</h3>
                <p>Coupon system is built with Java SpringBoot, MySql JavaScript & ReactJS</p>
                <p>I'm constantly learning new things, currently those things include gaining more experience with:</p>
                <p>Java, JavaSpringBoot, mySql and ReactJS</p>
            </Card>



        </Fragment >
    );
};

export default About;
