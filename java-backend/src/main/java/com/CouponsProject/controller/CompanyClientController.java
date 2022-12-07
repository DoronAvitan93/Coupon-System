package com.CouponsProject.controller;

import com.CouponsProject.CouponSystemEntities.Category;
import com.CouponsProject.CouponSystemEntities.Company;
import com.CouponsProject.CouponSystemEntities.Coupon;

import com.CouponsProject.service.ClientType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

import java.util.List;

import lombok.Data;

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

        int companyIdToReturn = loginManager.loginM(clientType, email, password);
        if (companyIdToReturn > 0) {

            System.out.println("Company Logged Successfully"); // print to backend
            System.out.println();
            ResponseEntity<Integer> responseWrapper = new ResponseEntity<>(companyIdToReturn, HttpStatus.OK); // print to client
            return responseWrapper;
        }

        System.out.println("Company login Error - incorrect email / password"); // print to backend
        System.out.println();
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("Company login Error - incorrect email / password ", HttpStatus.BAD_REQUEST); // print to client

        return responseWrapper;
    }


    // Add Coupon
    @PostMapping("/addCoupon")
    @ResponseBody
    public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon) throws Exception { // http://localhost:8080/CouponApp/addCoupon
        Coupon res = companyService.addCoupon(coupon); //main function.
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
        if (companyService.findCouponById(coupon.getId()) != null) {
            if (companyService.findCouponById(coupon.getId()).getCompany().getId() == coupon.getCompany().getId()) {

                companyService.updateCoupon(coupon);
                System.out.println("Coupon updated successfully! " + companyService.findCouponById(coupon.getId())); // print to backend
                ResponseEntity<?> response = new ResponseEntity<>("Coupon updated successfully! " + companyService.findCouponById(coupon.getId()), HttpStatus.OK);
                return response;
            }
        }
        System.out.println("No coupon exist by this ID: " + coupon.getId()); //print to backend
        ResponseEntity<?> response = new ResponseEntity<>("No coupon exist by this ID: " + coupon.getId(), HttpStatus.BAD_REQUEST);
        return response;
    }


    // Delete coupon
    @DeleteMapping("/deleteCouponById/{couponID}/{companyID}")
    @ResponseBody
    public ResponseEntity<?> deleteCouponById(@PathVariable int couponID, @PathVariable int companyID) throws Exception { // http://localhost:8080/CouponApp/deleteCouponById/{id}
        if (companyService.findCouponById(couponID) != null) {
            if (companyService.findCouponById(couponID).getCompany().getId() == companyID) {
                companyService.deleteCouponById(couponID);
                System.out.println("Coupon deleted Successfully!"); // print to backend
                System.out.println();
                ResponseEntity<String> responseWrapper = new ResponseEntity<>("Coupon deleted successfully! ", HttpStatus.OK); // print to client
                return responseWrapper;
            }
        }
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("Error, no coupon exist by this ID ", HttpStatus.BAD_REQUEST); // print to client
        System.out.println("Error, no coupon exist by this ID: " + couponID); // print to backend
        System.out.println();
        return responseWrapper;
    }


    //get all specific company coupons
    @GetMapping("/findCompanyCouponsByCompanyId/{id}")
    @ResponseBody
    public ResponseEntity<?> getAllCompanyCoupons(@PathVariable int id) throws Exception { // http://localhost:8080/CouponApp/findCompanyCouponsByCompanyId/{id}
        //find coupons by company id
        List<Coupon> res = companyService.findByCompanyId(id);
        if (!res.isEmpty()) {
            System.out.println("All company coupons from DB :"); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<?> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No coupons exist for this company: "); // return to backend
        System.out.println();
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("No coupons exist for this company: ", HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }


    //get all specific company coupons with category
    @GetMapping("/findCompanyCouponsByCompanyIdAndCategory/{id}/{category}")
    @ResponseBody
    public ResponseEntity<?> findCompanyCouponsByCompanyIdAndCategory(@PathVariable int id, @PathVariable Category category) throws Exception { // http://localhost:8080/CouponApp/findCompanyCouponsByCompanyIdAndCategory/{id}/{category}
        List<Coupon> res = companyService.findByCompanyIdAndCategory(id, category);
        if (!res.isEmpty()) {
            System.out.println("All company coupons from DB with category: " + category.toString().toLowerCase()); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Coupon>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No coupons exist for this company: "); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("No coupons exist for this company with category : " + category.toString().toLowerCase(), HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }


    //get all specific company coupons by max price
    @GetMapping("/findCompanyCouponsByCompanyIdAndMaxPrice/{id}/{price}") //
    @ResponseBody
    public ResponseEntity<?> findCompanyCouponsByCompanyIdAndMaxPrice(@PathVariable int id, @PathVariable double price) throws Exception { // http://localhost:8080/CouponApp/findCompanyCouponsByCompanyIdAndMaxPrice/{id}/{price}
        List<Coupon> res = companyService.findByCompanyIDAndPriceLessThanEqual(id, price);
        if (!res.isEmpty()) {
            System.out.println("All company coupons from DB with max price of: " + price); // print to backend
            System.out.println("Coupons amount found: " + res.size());
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Coupon>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No coupons exist for this company with max price of: " + price); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("No coupons exist for this company with max price of :" + price, HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }


    // Find coupon by ID
    @GetMapping("/findCouponByID/{id}")  // http://localhost:8080/CouponApp/findCouponByID/{id}
    @ResponseBody
    public ResponseEntity<?> getCouponById(@PathVariable int id) throws Exception {
        Coupon res = companyService.findCouponById(id);
        if (res != null) {
            System.out.println("Coupon from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<Coupon> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No coupon exist by this ID: " + id); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("Error, no coupon exist by this ID ", HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }


    // Get company details
    @GetMapping("/getCompanyDetailsById/{id}")  // http://localhost:8080/CouponApp/getCompanyDetailsById/{id}
    @ResponseBody
    public ResponseEntity<?> getCompanyById(@PathVariable int id) throws Exception {
        Company res = companyService.getCompanyById(id);
        if (res != null) {
            System.out.println("Company from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<Company> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No company exist by this ID: " + id); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("Error, no companyzcxz exist by this ID ", HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }
}
