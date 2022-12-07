package com.CouponsProject2.controller;
import org.springframework.stereotype.Controller;

import com.CouponsProject2.CouponSystemEntities.Category;
import com.CouponsProject2.CouponSystemEntities.Coupon;
import com.CouponsProject2.CouponSystemEntities.Customer;

import com.CouponsProject2.service.ClientType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

import java.util.List;

@Controller
@RequestMapping("CouponApp")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CustomerClientController extends ClientControllerAbs {


    //Login Customer
    @GetMapping("login/Customer/{clientType}/{email}/{password}")
    @ResponseBody
    @Override
    //http://localhost:8080/CouponApp/login/Customer/{clientType}/{email}/{password}
    public ResponseEntity<?> login(@PathVariable ClientType clientType, @PathVariable String email, @PathVariable String password) throws SQLException {

        int customerIdToReturn = loginManager.loginM(clientType, email, password);
        if (customerIdToReturn > 0) {

            System.out.println("Customer Logged Successfully"); // print to backend
            System.out.println();
            ResponseEntity<Integer> responseWrapper = new ResponseEntity<>(customerIdToReturn, HttpStatus.OK); // print to client
            return responseWrapper;
        }

        System.out.println("Customer login Error - incorrect email / password"); // print to backend
        System.out.println();
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("Customer login Error - incorrect email / password ", HttpStatus.BAD_REQUEST); // print to client

        return responseWrapper;
    }


    // Purchase Coupon
    @PostMapping("/purchaseCoupon/{couponID}/{customerID}")
    @ResponseBody
    public ResponseEntity<?> purchaseCoupon(@PathVariable int couponID, @PathVariable int customerID) throws Exception { // http://localhost:8080/CouponApp/purchaseCoupon/couponID/customerID
        System.out.println("Using purchaseCoupon function..."); // print to backend

        //checking if coupon exist
        if (companyService.findCouponById(couponID) == null) {
            System.out.println("Coupon does not exist!"); // print to backend
            ResponseEntity<?> response = new ResponseEntity<>("Coupon does not exist!", HttpStatus.BAD_REQUEST); // print to client
            return response;

        } else {
            //checking if customer exist
            if (customerService.findCustomerById(customerID) == null) {
                System.out.println("Customer does not exist!"); // print to backend
                ResponseEntity<?> response = new ResponseEntity<>("Customer does not exist!", HttpStatus.NOT_ACCEPTABLE); // print to client
                return response;

            } else {
                //using the purchaseCoupon function and declaring int return by the result
                int customerServiceIntReturn = customerService.purchaseCoupon(companyService.findCouponById(couponID), customerService.findCustomerById(customerID));

                //checking if coupon end date is expired, will return int 1 if yes
                if (customerServiceIntReturn == 1) {
//                    System.out.println("enter 1");
                    System.out.println("Coupon expired - can't purchase coupon!");
                    ResponseEntity<?> response = new ResponseEntity<>("Coupon expired - can't purchase coupon!", HttpStatus.BAD_REQUEST); // print to client
                    return response;

                } else {
                    //checking if coupon amount is > 0, will return int 2 if yes
                    if (customerServiceIntReturn == 2) {
//                        System.out.println("enter 2");
                        System.out.println("Coupon amount is 0 - can't purchase coupon!");
                        ResponseEntity<?> response = new ResponseEntity<>("Coupon amount is 0 - can't purchase coupon!", HttpStatus.BAD_REQUEST); // print to client
                        return response;

                    } else {
                        //checking if customer already purchased this coupon, will return int 3 if yes
                        if (customerServiceIntReturn == 3) {
//                            System.out.println("enter 3");
                            System.out.println("Customer already purchased this coupon!");
                            ResponseEntity<?> response = new ResponseEntity<>("You already purchased this coupon!", HttpStatus.BAD_REQUEST); // print to client
                            return response;

                        } else {
                            //purchase coupon after all the checks, will return int 0 if yes
                            if (customerServiceIntReturn == 0) {
//                                System.out.println("enter 4");
                                System.out.println("Coupon purchased successfully!");
                                ResponseEntity<?> response = new ResponseEntity<>("Coupon purchased successfully!", HttpStatus.OK); // print to client
                                return response;
                            }
                        }
                    }
                }
            }
        }
        System.out.println("Error");
        return null;
    }


    //get all customer coupons
    @GetMapping("/findCustomerCoupons/{id}")
    @ResponseBody
    public ResponseEntity<?> getAllCustomerCoupons(@PathVariable int id) throws Exception { // http://localhost:8080/CouponApp/findCustomerCoupons/{id}
        //checking if customer exist
        Customer resCustomer = customerService.findCustomerById(id);

        //if costumer exist
        if (resCustomer != null) {
            List<Coupon> customerCoupons = customerService.getAllCostumerCoupons(id);

            //checking if customer have coupons, if exist - will print
            if (!customerCoupons.isEmpty()) {
                System.out.println("All customer coupons from DB :"); // print to backend
                System.out.println(customerCoupons); // print to backend
                System.out.println();
                ResponseEntity<?> responseWrapper = new ResponseEntity<>(customerCoupons, HttpStatus.OK); // print to client
                return responseWrapper;

                //if customer coupons empty
            } else {
                System.out.println("No coupons exist for this customer"); // return to backend
                System.out.println();
                ResponseEntity<String> responseWrapper = new ResponseEntity<>("No coupons exist for this customer: ", HttpStatus.BAD_REQUEST); // return to client
                return responseWrapper;
            }

            //if no costumer exist
        } else {
            System.out.println("No costumer exist!"); // return to backend
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("No costumer exist!", HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }


    //get all specific company coupons with category
    @GetMapping("/findCustomerCouponsByCustomerIdAndCategory/{id}/{category}")
    @ResponseBody
    public ResponseEntity<?> findCustomerCouponsByCustomerIdAndCategory(@PathVariable int id, @PathVariable Category category) throws Exception { // http://localhost:8080/CouponApp/findCustomerCouponsByCustomerIdAndCategory/{id}/{category}
        List<Coupon> res = customerService.getAllCostumerCouponsWithCategory(id, category);
        if (!res.isEmpty()) {
            System.out.println("All customer coupons from DB with category: " + category.toString().toLowerCase()); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Coupon>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No coupons exist for this customer by this category: " + category.toString().toLowerCase()); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("No coupons exist for this customer with category : " + category.toString().toLowerCase(), HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }


    //get all customer coupons by max price
    @GetMapping("/findCustomerCouponsWithMaxPrice/{id}/{price}")
    @ResponseBody
    public ResponseEntity<?> getAllCustomerCouponsWithCategory(@PathVariable int id, @PathVariable int price) throws Exception { // http://localhost:8080/CouponApp/findCustomerCouponsWithMaxPrice/{id}/{price}
        //checking if customer exist
        Customer resCustomer = customerService.findCustomerById(id);

        //if costumer exist
        if (resCustomer != null) {
            List<Coupon> customerCouponsByMaxPrice = customerService.getAllCostumerCouponsWithMaxPrice(id, price);

            //checking if customer have coupons, if exist - will print
            if (!customerCouponsByMaxPrice.isEmpty()) {
                System.out.println("All customer coupons by max price from DB :"); // print to backend
                System.out.println(customerCouponsByMaxPrice); // print to backend
                System.out.println();
                ResponseEntity<?> responseWrapper = new ResponseEntity<>(customerCouponsByMaxPrice, HttpStatus.OK); // print to client
                return responseWrapper;

                //if customer coupons empty
            } else {
                System.out.println("No coupons exist for this customer by this price: "+price); // return to backend
                System.out.println();
                ResponseEntity<String> responseWrapper = new ResponseEntity<>("No coupons exist for this customer by this price: "+price, HttpStatus.BAD_REQUEST); // return to client
                return responseWrapper;
            }

            //if no costumer exist
        } else {
            System.out.println("No costumer exist!"); // return to backend
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("No costumer exist!", HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }


    // Get customer details
    @GetMapping("/getCustomerDetailsById/{id}")  // http://localhost:8080/CouponApp/getCustomerDetailsById/{id}
    @ResponseBody
    public ResponseEntity<?> getCompanyById(@PathVariable int id) throws Exception {
        Customer res = customerService.findCustomerById(id);
        if (res != null) {
            System.out.println("Customer from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<Customer> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No Customer exist by this ID: " + id); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("Error, no customer exist by this ID ", HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }


}