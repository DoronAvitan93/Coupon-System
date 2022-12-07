package com.CouponsProject;

import com.CouponsProject.ExpirationCoupons.DailyJobExpirationCoupons;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

//For testing input:

//you need to run the test() function in Main

//Admin login:
// userName = admin@admin
// userPassword = admin

//Company login:
//companyEmail = EmailComp(number 1 - 9)
//companyPassword = PasswordComp(number given at Email)

//Customer login:
//customerEmail = EmailCus(number 1 - 9)
//customerPassword = PasswordCus(number given at Email)

@SpringBootApplication
public class Application {


    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(Application.class, args);
        Test test = ctx.getBean(Test.class);

        System.out.println();
        System.out.println("Spring boot is ON!");
        System.out.println();


        //Thread that check the expiration of the coupons every 1h
        DailyJobExpirationCoupons dailyJobExpirationCoupons = ctx.getBean(DailyJobExpirationCoupons.class);


        //Daily job for expired coupons
        dailyJobExpirationCoupons.start();


        //testing the system
//        try {
//            Thread.sleep(2000);
//            while (true) test.systemTest();
//        } catch (Exception e) {
//            System.out.println(e);
//        }


    }
}
