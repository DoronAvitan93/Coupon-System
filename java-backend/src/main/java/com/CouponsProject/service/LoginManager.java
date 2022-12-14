package com.CouponsProject.service;

import com.CouponsProject.CouponSystemEntities.Company;
import com.CouponsProject.CouponSystemEntities.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLException;

//Login logic

@Component
public class LoginManager {

    private static LoginManager loginManager;
    @Autowired
    private AdminService adminService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CustomerService customerService;


    private final String adminEmail = "admin@admin";
    private final String adminPassword = "admin";


    private LoginManager() {
        super();
    }


    public int loginM(ClientType clientType, String clientEmail, String clientPassword) throws SQLException {

        try {
            //Admin Login

            if (clientType == ClientType.Administrator) {
                //checking login inputs
                if (clientEmail.equals(adminEmail) && clientPassword.equals(adminPassword)) {
//                    System.out.println("Admin logged successfully");
//                    System.out.println();

                    //fixed ID
                    return 19584413;
                } else {

//                    System.out.println("Admin login Error - incorrect email / password");
//                    System.out.println();
                    return -1;
                }
            } else

                //Company Login
                if (clientType == ClientType.Company) {
                    //checking login inputs in the DB (email and password)
                    Company resCompany = companyService.companiesRepository.findByEmailAndPassword(clientEmail, clientPassword);
                    if (resCompany != null) {
//                        System.out.println("Company Logged Successfully");
//                        System.out.println();
                        return resCompany.getId();
                    } else {
//                        System.out.println("Company login Error - incorrect email / password");
//                        System.out.println();
                        return -1;
                    }
                } else

                    //Customer Login
                    if (clientType == ClientType.Customer) {
                        //checking login inputs in the DB (email and password)
                        Customer resCustomer = customerService.customerRepository.findByEmailAndPassword(clientEmail, clientPassword);
                        if (resCustomer != null) {
//                            System.out.println("Customer Logged Successfully");
//                            System.out.println();
                            return resCustomer.getId();
                        } else {
//                            System.out.println("Customer login Error - incorrect email / password");
//                            System.out.println();
                            return -1;
                        }
                    } else {
                        System.out.println("ENTER SOMETHING");
                        return -2;

                    }
        } catch (Exception e) {
            System.out.println("Error - Cant access to the DataBase.");
            System.out.println(e);
            return -1;
        }
    }
}

