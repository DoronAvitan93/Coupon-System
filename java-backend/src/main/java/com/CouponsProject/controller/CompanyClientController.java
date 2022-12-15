package com.CouponsProject.controller;

import com.CouponsProject.CouponSystemEntities.Category;
import com.CouponsProject.CouponSystemEntities.Company;
import com.CouponsProject.CouponSystemEntities.Coupon;

import com.CouponsProject.service.ClientType;

import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

import java.util.List;

import lombok.Data;

@EqualsAndHashCode(callSuper = true)
@Data
@Controller
@RequestMapping("CouponApp")
@CrossOrigin
public class CompanyClientController extends ClientControllerAbs {



    //Login Company
    @GetMapping("login/Company/{clientType}/{email}/{password}")
    @ResponseBody
    @Override
    //http://localhost:8080/CouponApp/login/Company/{clientType}/{email}/{password}
    public ResponseEntity<?> login(@PathVariable ClientType clientType, @PathVariable String email, @PathVariable String password) throws SQLException {
        System.out.println("Using login function..."); // print to backend

        //will return the company ID if logged in successfully
        int companyIdToReturn = loginManager.loginM(clientType, email, password);
        //check if logged in successfully (-1 = error)
        if (companyIdToReturn != -1) {
            System.out.println("Company Logged Successfully"); // print to backend
            System.out.println();
            ResponseEntity<Integer> responseWrapper = new ResponseEntity<>(companyIdToReturn, HttpStatus.OK); // print to client
            return responseWrapper;

        } else {
            System.out.println("Company login Error - incorrect email / password"); // print to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("Company login Error - incorrect email / password ", HttpStatus.BAD_REQUEST); // print to client

            return responseWrapper;
        }
    }



    // Add Coupon to company
    @PostMapping("/addCoupon")
    @ResponseBody
    public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon) { // http://localhost:8080/CouponApp/addCoupon
        System.out.println("Using addCoupon function..."); // print to backend

        Coupon res = companyService.addCoupon(coupon);

        //check if coupon added successfully
        if (res != null) {
            System.out.println("Coupon added successfully!"); // print to backend
            System.out.println(coupon);
            ResponseEntity<?> response = new ResponseEntity<>("Coupon added successfully! " + coupon, HttpStatus.OK); // print to the client
            return response;

        } else {
            System.out.println("Cant add coupon - title already exist."); // print to backend
            ResponseEntity<?> response = new ResponseEntity<>("Cant add coupon - title already exist.", HttpStatus.BAD_REQUEST); // print to the client
            return response;
        }
    }



    // Update coupon
    @PutMapping("/updateCoupon/")
    @ResponseBody
    public ResponseEntity<?> updateCoupon(@RequestBody Coupon coupon) { // http://localhost:8080/CouponApp/updateCoupon/
        System.out.println("Using updateCoupon function..."); // print to backend

        //check if coupon exist before updating
        if (companyService.findCouponById(coupon.getId()) != null) {
            //check if the future updated coupon belong to the company (cant update other companies coupons - only the coupons that belong to the company)
            if (companyService.findCouponById(coupon.getId()).getCompany().getId() == coupon.getCompany().getId()) {
                companyService.updateCoupon(coupon);
                System.out.println("Coupon updated successfully! " + companyService.findCouponById(coupon.getId())); // print to backend
                ResponseEntity<?> response = new ResponseEntity<>("Coupon updated successfully! " + companyService.findCouponById(coupon.getId()), HttpStatus.OK);
                return response;
            }

            //if coupon doesn't exist or doesn't belong to the company
        }
        System.out.println("No coupon exist by this ID: " + coupon.getId()); //print to backend
        ResponseEntity<?> response = new ResponseEntity<>("No coupon exist by this ID: " + coupon.getId(), HttpStatus.BAD_REQUEST);
        return response;
    }



    // Delete coupon
    @DeleteMapping("/deleteCouponById/{couponID}/{companyID}")
    @ResponseBody
    public ResponseEntity<?> deleteCouponById(@PathVariable int couponID, @PathVariable int companyID) { // http://localhost:8080/CouponApp/deleteCouponById/{id}
        System.out.println("Using deleteCouponById function..."); // print to backend

        //check if coupon exist before trying to delete it
        if (companyService.findCouponById(couponID) != null) {
            //check if the future deleted coupon belong to the company (cant delete other companies coupons - only the coupons that belong to the company)
            if (companyService.findCouponById(couponID).getCompany().getId() == companyID) {
                companyService.deleteCouponById(couponID);
                System.out.println("Coupon deleted Successfully!"); // print to backend
                System.out.println();
                ResponseEntity<String> responseWrapper = new ResponseEntity<>("Coupon deleted successfully! ", HttpStatus.OK); // print to client
                return responseWrapper;
            }

            //if coupon doesn't exist or doesn't belong to the company
        }
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("Error, no coupon exist by this ID ", HttpStatus.BAD_REQUEST); // print to client
        System.out.println("Error, no coupon exist by this ID: " + couponID); // print to backend
        System.out.println();
        return responseWrapper;
    }



    //get all specific company coupons
    @GetMapping("/findCompanyCouponsByCompanyId/{id}")
    @ResponseBody
    public ResponseEntity<?> getAllCompanyCoupons(@PathVariable int id) { // http://localhost:8080/CouponApp/findCompanyCouponsByCompanyId/{id}
        System.out.println("Using getAllCompanyCoupons function..."); // print to backend

        //making a coupons list by company id
        List<Coupon> res = companyService.findByCompanyId(id);

        //check if company has any coupons
        if (!res.isEmpty()) {
            System.out.println("All company coupons from DB :"); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<?> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;

        } else {
            System.out.println("No coupons exist for this company: "); // return to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("No coupons exist for this company: ", HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }



    //get all specific company coupons with category
    @GetMapping("/findCompanyCouponsByCompanyIdAndCategory/{id}/{category}")
    @ResponseBody
    public ResponseEntity<?> findCompanyCouponsByCompanyIdAndCategory(@PathVariable int id, @PathVariable Category category) { // http://localhost:8080/CouponApp/findCompanyCouponsByCompanyIdAndCategory/{id}/{category}
        System.out.println("Using findCompanyCouponsByCompanyIdAndCategory function..."); // print to backend

        //making a coupons list by company id and specific category
        List<Coupon> res = companyService.findByCompanyIdAndCategory(id, category);

        //check if company has any coupons by selected category
        if (!res.isEmpty()) {
            System.out.println("All company coupons from DB with category: " + category.toString().toLowerCase()); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Coupon>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;

        } else {
            System.out.println("No coupons exist for this company: "); // return to backend
            System.out.println();
            ResponseEntity<?> responseWrapper = new ResponseEntity<>("No coupons exist for this company with category : " + category.toString().toLowerCase(), HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }



    //get all specific company coupons by max price
    @GetMapping("/findCompanyCouponsByCompanyIdAndMaxPrice/{id}/{price}") //
    @ResponseBody
    public ResponseEntity<?> findCompanyCouponsByCompanyIdAndMaxPrice(@PathVariable int id, @PathVariable double price) { // http://localhost:8080/CouponApp/findCompanyCouponsByCompanyIdAndMaxPrice/{id}/{price}
        System.out.println("Using findCompanyCouponsByCompanyIdAndMaxPrice function..."); // print to backend

        //making a coupons list by company id and specific price
        List<Coupon> res = companyService.findByCompanyIDAndPriceLessThanEqual(id, price);

        //check if company has any coupons by selected price
        if (!res.isEmpty()) {
            System.out.println("All company coupons from DB with max price of: " + price); // print to backend
            System.out.println("Coupons amount found: " + res.size());
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Coupon>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;

        } else {
            System.out.println("No coupons exist for this company with max price of: " + price); // return to backend
            System.out.println();
            ResponseEntity<?> responseWrapper = new ResponseEntity<>("No coupons exist for this company with max price of :" + price, HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }



    // Find coupon by ID
    @GetMapping("/findCouponByID/{id}")  // http://localhost:8080/CouponApp/findCouponByID/{id}
    @ResponseBody
    public ResponseEntity<?> getCouponById(@PathVariable int id) {
        System.out.println("Using getCouponById function..."); // print to backend

        Coupon res = companyService.findCouponById(id);

        //check if coupon exist
        if (res != null) {
            System.out.println("Coupon from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<Coupon> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;

        } else {
            System.out.println("No coupon exist by this ID: " + id); // return to backend
            System.out.println();
            ResponseEntity<?> responseWrapper = new ResponseEntity<>("Error, no coupon exist by this ID ", HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }



    // Get company details
    @GetMapping("/getCompanyDetailsById/{id}")  // http://localhost:8080/CouponApp/getCompanyDetailsById/{id}
    @ResponseBody
    public ResponseEntity<?> getCompanyById(@PathVariable int id) {
        System.out.println("Using getCompanyById function..."); // print to backend

        Company res = companyService.getCompanyById(id);

        //check if company exist
        if (res != null) {
            System.out.println("Company from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<Company> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;

        } else {
            System.out.println("No company exist by this ID: " + id); // return to backend
            System.out.println();
            ResponseEntity<?> responseWrapper = new ResponseEntity<>("Error, no company exist by this ID ", HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }
}
