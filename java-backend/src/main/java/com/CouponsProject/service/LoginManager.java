package com.CouponsProject.service;

import com.CouponsProject.CouponSystemEntities.Company;
import com.CouponsProject.CouponSystemEntities.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.SQLException;


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
                if (clientEmail.equals(adminEmail) && clientPassword.equals(adminPassword)) {
//                    System.out.println("Admin logged successfully");
                    System.out.println();

                    //fixed ID for security
                    return 19584413;
                } else {
//                    System.out.println("Admin login Error - incorrect email / password");
                    System.out.println();
                }
            } else

                //Company Login
                if (clientType == ClientType.Company) {
                    Company resCompany = companyService.companiesRepository.findByEmailAndPassword(clientEmail, clientPassword);
                    if (resCompany != null) {
//                        System.out.println("Company Logged Successfully");
                        System.out.println();
                        return resCompany.getId();
                    } else {
//                        System.out.println("Company login Error - incorrect email / password");
                        System.out.println();
                    }
                } else

                    //Customer Login
                    if (clientType == ClientType.Customer) {
                        Customer resCustomer = customerService.customerRepository.findByEmailAndPassword(clientEmail, clientPassword);
                        if (resCustomer != null) {
//                            System.out.println("Customer Logged Successfully");
                            System.out.println();
                            return resCustomer.getId();
                        } else {
//                            System.out.println("Customer login Error - incorrect email / password");
                            System.out.println();
                        }
                    } else {
                        return -1;
                    }
        } catch (Exception e) {
            System.out.println("Error - Cant access to the DataBase.");
            System.out.println(e);
            return -1;
        }

        return -1;
    }
}

