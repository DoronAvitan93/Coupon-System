package com.CouponsProject;

import com.CouponsProject.CouponSystemEntities.Category;
import com.CouponsProject.CouponSystemEntities.Company;
import com.CouponsProject.CouponSystemEntities.Coupon;
import com.CouponsProject.CouponSystemEntities.Customer;

import com.CouponsProject.repository.CompaniesRepository;
import com.CouponsProject.repository.CouponsRepository;
import com.CouponsProject.repository.CustomerRepository;

import com.CouponsProject.service.*;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;


@Component
public class Test {

    @Autowired
    private AdminService adminService;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CompaniesRepository companiesRepository;
    @Autowired
    private CouponsRepository couponsRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private LoginManager loginManager;


    public void systemTest() {
        //use this to fresh start each time you running the program
//        adminService.deleteAll();


        Scanner userScanner = new Scanner(System.in);

        //~~~~~~~~~~~~~ Admin Testing ~~~~~~~~~~~~~

        //Admin login
        boolean adminNeedToBeLoggedIn = true;
        while (adminNeedToBeLoggedIn) {
            System.out.println("This is admin testing! (for exit - press 0)");
            System.out.println("Please enter admin email: ");
            String userNameInput = userScanner.nextLine();
            if (userNameInput.equals("0")) {
                break;
            }
            System.out.println("Please enter admin password: ");
            String userPasswordInput = userScanner.nextLine();


            try {
//                // 19584413 = admin fixed ID
                if (loginManager.loginM(ClientType.Administrator, userNameInput, userPasswordInput) == 19584413) {
                    adminNeedToBeLoggedIn = false;

                    //Add new company
                    //*Cant add company title that already exist, Cant add company with mail that already exist.
                    System.out.println("Adding companies...");
                    System.out.println();
                    for (int i = 0; i < 10; i++) {
                        Company company = Company.builder().name("Name" + i).email("EmailComp@company" + i).password("PasswordComp" + i).build();
                        System.out.println("Add company :" + company);
                        adminService.addCompany(company);
                    }
                    System.out.println();

                    //Can only update from controller now. 31.10.22
                    //Update company
                    //*Cant update company ID, Cant update company name.
                    Company companyToUpdate = adminService.getAllCompanies().get(0);
                    System.out.println("Updating company: " + companyToUpdate.getName());
                    System.out.println();
                    companyToUpdate.setEmail("Email Updated");
                    companyToUpdate.setPassword("Password Updated");
                    adminService.updateCompany(companyToUpdate);


                    //Delete company
                    //*Deleting company coupons, Deleting purchase history coupons by the customers.
                    Company companyToDelete = adminService.findCompanyById(adminService.getAllCompanies().get(1).getId());
                    System.out.println("Deleting company: " + companyToDelete.getName());
                    System.out.println();
                    adminService.deleteCompanyById(companyToDelete.getId());


                    //Get all companies
                    System.out.println("Getting all companies from DB: ");
                    System.out.println(adminService.getAllCompanies());
                    System.out.println();


                    //Get specific company by ID
                    System.out.println("Getting company by ID: ");
                    System.out.println(adminService.findCompanyById(adminService.getAllCompanies().get(2).getId()));
                    System.out.println();


                    //Add customer
                    //*Cant add customer email that already exist.
                    System.out.println("Adding customers...");
                    System.out.println();
                    for (int i = 0; i < 10; i++) {
                        Customer customer = Customer.builder().firstName("firstName" + i).lastName("lastName" + i).email("EmailCus@customer" + i).password("PasswordCus" + i).build();
                        System.out.println("Adding customer :" + customer);
                        adminService.addCustomer(customer);
                    }
                    System.out.println();


                    //Update existing customer
                    //*Cant update customer ID.
                    Customer customerToUpdate = adminService.getAllCustomers().get(0);
                    System.out.println("Updating customer: " + customerToUpdate.getFirstName() + " " + customerToUpdate.getLastName());
                    System.out.println();
                    adminService.updateCustomer(customerToUpdate.getId(), "updatedFirstName", "updatedLastName", "updatedEmail", "updatedPassword");


                    //Delete existing customer
                    //*Deleting customer coupons purchase history.
                    Customer customerToDelete = adminService.getAllCustomers().get(1);
                    System.out.println("Deleting customer: " + customerToDelete.getFirstName() + " " + customerToDelete.getLastName());
                    System.out.println();
                    adminService.deleteCustomerById(customerToDelete.getId());


                    //Get all customers
                    System.out.println("Getting all customers from DB: ");
                    System.out.println(adminService.getAllCustomers());
                    System.out.println();


                    //Get specific customer by ID
                    System.out.println("Specific customer by ID: ");
                    System.out.println(adminService.findCustomerById(adminService.getAllCustomers().get(2).getId()));


                    System.out.println();
                    System.out.println("Admin testing is ended successfully!");
                    System.out.println();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }


//        ~~~~~~~~~~~~~ Company Testing ~~~~~~~~~~~~~

        //Company login
        boolean CompanyNeedToBeLoggedIn = true;
        while (CompanyNeedToBeLoggedIn) {
            System.out.println("This is company testing! (for exit press 0)");
            System.out.println("Please enter company email: ");
            String userNameInput1 = userScanner.nextLine();
            if (userNameInput1.equals("0")) {
                break;
            }
            System.out.println("Please enter company password: ");
            String userPasswordInput1 = userScanner.nextLine();


            try {
                if (loginManager.loginM(ClientType.Company, userNameInput1, userPasswordInput1) > 0) {
                    CompanyNeedToBeLoggedIn = false;

                    //Company from DB (email and password)
                    Company resCompany = companiesRepository.findByEmailAndPassword(userNameInput1, userPasswordInput1);


                    //Add new coupon
                    System.out.println("Adding coupons...");
                    for (int i = 0; i < 10; i++) {
                        Coupon coupon = Coupon.builder().company(resCompany).title("Title" + i).category(Category.ELECTRICITY).description("Descrip" + i).startDate(LocalDate.now()).endDate(LocalDate.of(2023, 01, 01)).amount(1 + i).price(2 * i).image("ImageUrl" + i).build();
                        System.out.println("Add coupon :" + coupon);
                        companyService.addCoupon(coupon);
                    }
                    System.out.println();


                    //Update coupon
                    //*Cant update coupon ID, Cant update company ID.
                    Coupon couponToUpdate = couponsRepository.findByCompanyId(resCompany.getId()).get(0);
                    System.out.println("Updating coupon: " + couponToUpdate.getTitle());
                    System.out.println();
                    companyService.updateCoupon(couponToUpdate);


                    //Delete existing coupon
                    //*Delete coupon history purchase
                    Coupon couponToDelete = couponsRepository.findByCompanyId(resCompany.getId()).get(1);
                    System.out.println("Deleting coupon: " + couponToDelete.getTitle());
                    System.out.println();
                    companyService.deleteCouponById(couponToDelete.getId());


                    //Getting all company coupons
                    List<Coupon> allCompanyCoupons = companyService.findByCompanyId(resCompany.getId());
                    System.out.println("All company coupons from DB: ");
                    System.out.println(allCompanyCoupons);
                    System.out.println();


                    //Getting all company coupons from specific category
                    System.out.println("Getting all company coupons by category: ");
                    List<Coupon> allCompanyCouponsWithCategory = companyService.findByCompanyIdAndCategory(resCompany.getId(), Category.ELECTRICITY);
                    System.out.println(allCompanyCouponsWithCategory);
                    System.out.println();


                    //Getting all company coupons within specific price range
                    System.out.println("Getting all company coupons by price range: ");
                    List<Coupon> allCompanyCouponsWithinPrice = companyService.findByCompanyIDAndPriceLessThanEqual(resCompany.getId(), 6);
                    System.out.println(allCompanyCouponsWithinPrice);
                    System.out.println();


                    //Getting company details
                    System.out.println("Company details: ");
                    System.out.println(companyService.getCompanyById(resCompany.getId()));
                    System.out.println();


                    System.out.println();
                    System.out.println("Company testing is ended successfully!");
                    System.out.println();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }


        //        ~~~~~~~~~~~~~ Customer Testing ~~~~~~~~~~~~~
        boolean CustomerNeedToBeLoggedIn = true;
        while (CustomerNeedToBeLoggedIn) {
            System.out.println("This is customer testing! (for exit press 0)");
            System.out.println("Please enter customer email: ");
            String userNameInput2 = userScanner.nextLine();
            if (userNameInput2.equals("0")) {
                break;
            }
            System.out.println("Please enter customer password: ");
            String userPasswordInput2 = userScanner.nextLine();
            try {
                if (loginManager.loginM(ClientType.Customer, userNameInput2, userPasswordInput2) > 0) {
                    CustomerNeedToBeLoggedIn = false;


                    //Customer from DB (email and password)
                    Customer resCustomer = customerRepository.findByEmailAndPassword(userNameInput2, userPasswordInput2);


                    //Purchase coupon
                    //*Cant purchase coupon twice, Cant purchase coupon if amount < 0, Cant purchase coupon if end date expired, After purchase amount will -1.
                    Coupon couponToPurchase = couponsRepository.findAll().get(0);
                    System.out.println("Purchasing coupon: " + couponToPurchase.getTitle());
                    System.out.println();
                    customerService.purchaseCoupon(couponToPurchase, resCustomer);


                    //Get all customer purchased coupons
                    List<Coupon> allCustomerPurchasedCoupons = customerService.getAllCostumerCoupons(resCustomer.getId());
                    System.out.println("All customer purchased coupons from DB: ");
                    System.out.println(allCustomerPurchasedCoupons);
                    System.out.println();


                    //Get all customer purchased coupons from specific category
                    System.out.println("Getting all customer purchased coupons by category: ");
                    List<Coupon> allCustomerPurchasedCouponsWithCategory = customerService.getAllCostumerCouponsWithCategory(resCustomer.getId(), Category.RESTAURANT);
                    System.out.println(allCustomerPurchasedCouponsWithCategory);
                    System.out.println();


                    //Getting all customer purchased coupons within specific price range
                    System.out.println("Getting all customer purchased coupons by price range: ");
                    List<Coupon> allCustomerPurchasedCouponsWithinPrice = customerService.getAllCostumerCouponsWithMaxPrice(resCustomer.getId(), 100);
                    System.out.println(allCustomerPurchasedCouponsWithinPrice);
                    System.out.println();


                    //Get customer details
                    System.out.println("Customer details: ");
                    System.out.println(customerService.findCustomerById(resCustomer.getId()));
                    System.out.println();


                    System.out.println();
                    System.out.println("Customer testing is ended successfully!");
                    System.out.println();
                }
            } catch (SQLException e) {
                System.out.println(e);
            }
        }
    }
}