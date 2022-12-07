package com.CouponsProject2.controller;

import com.CouponsProject2.CouponSystemEntities.Category;
import com.CouponsProject2.CouponSystemEntities.Company;
import com.CouponsProject2.CouponSystemEntities.Coupon;
import com.CouponsProject2.CouponSystemEntities.Customer;
import com.CouponsProject2.service.ClientType;

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
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminClientController extends ClientControllerAbs {


    //Login Admin
    @GetMapping("login/Administrator/{clientType}/{email}/{password}")
    @ResponseBody
    @Override
    //http://localhost:8080/CouponApp/login/Administrator/{clientType}/{email}/{password}
    public ResponseEntity<?> login(@PathVariable ClientType clientType, @PathVariable String email, @PathVariable String password) throws SQLException {

        // "0" means true
        int adminID = loginManager.loginM(clientType, email, password);

        if (adminID > 0 && clientType == ClientType.Administrator) {
            System.out.println("Admin Logged Successfully"); // print to backend
            System.out.println();
            ResponseEntity<?> responseWrapper = new ResponseEntity<>(adminID, HttpStatus.OK); // print to client
            return responseWrapper;
        }

        System.out.println("Admin login Error - incorrect email / password"); // print to backend
        System.out.println();
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("Admin login Error - incorrect email / password ", HttpStatus.BAD_REQUEST); // print to client

        return responseWrapper;
    }


// Add Company
    // Working + if email or name exist + postman
    // JSON:
    //  {
    //    "name": "enterName",
    //    "email": "enterEmail",
    //    "password": "enterPassword"
    //  }


    @PostMapping("/addCompany")
    @ResponseBody
    public ResponseEntity<?> addCompany(@RequestBody Company company) throws Exception { // http://localhost:8080/CouponApp/addCompany

        Company res = adminService.addCompany(company);
        if (res != null) {
            System.out.println("Company added successfully!"); // print to backend
            System.out.println(company);
            ResponseEntity<?> response = new ResponseEntity<>("Company added successfully! " + company, HttpStatus.OK); // print to the client
            return response;
        } else {

            System.out.println("Cant add company - email or name already exist."); // print to backend
            ResponseEntity<?> response = new ResponseEntity<>("Cant add company - email or name already exist.", HttpStatus.BAD_REQUEST); // print to the client
            return response;
        }
    }


    // Update company
    // Working + test if + postman
    // id = what company to update, email = update to new email, password = update to new password
    @PutMapping("/updateCompany/")
    @ResponseBody
    public ResponseEntity<?> updateCompany(@RequestBody Company company) throws Exception { // http://localhost:8080/CouponApp/updateCompany/
        //checking if company exist by id
        if (adminService.findCompanyById(company.getId()) != null) {
            //checking if email exist already
            if (adminService.updateCompany(company) != null) {
                System.out.println("Company updated successfully! " + adminService.findCompanyById(company.getId())); // print to backend
                ResponseEntity<?> response = new ResponseEntity<>("Company updated successfully! " + adminService.findCompanyById(company.getId()), HttpStatus.OK);
                return response;
            } else {
                System.out.println("Email already exist!"); //print to backend
                ResponseEntity<?> response = new ResponseEntity<>("Email already exist!", HttpStatus.BAD_REQUEST);
                return response;
            }
        } else {
            System.out.println("No company exist by this ID: " + company.getId()); //print to backend
            ResponseEntity<?> response = new ResponseEntity<>("No company exist by this ID: " + company.getId(), HttpStatus.BAD_REQUEST);
            return response;
        }
    }


    // Delete company by ID
    // Working + test if exist + postman
    @DeleteMapping("deleteCompanyById/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteCompanyById(@PathVariable int id) throws Exception { // http://localhost:8080/CouponApp/deleteCompanyById/{id}
        if (adminService.findCompanyById(id) != null) {
            adminService.deleteCompanyById(id);
            System.out.println("Company & company coupons deleted Successfully!"); // print to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("Company & company coupons deleted Successfully! ", HttpStatus.OK); // print to client
            return responseWrapper;
        }
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("No company exist by this ID: "+id, HttpStatus.BAD_REQUEST); // print to client
        System.out.println("Error, no company exist by this ID: " + id); // print to backend
        System.out.println();
        return responseWrapper;
    }


    // Get all companies
    // Working + test if there is companies + postman
    @GetMapping("/getAllCompanies") // http://localhost:8080/CouponApp/getAllCompanies
    @ResponseBody
    public ResponseEntity<?> getAllCompanies() { // we can use <?> too.
        List<Company> res = adminService.getAllCompanies(); //main function.
        if (!res.isEmpty()) {
            System.out.println("Companies found: " + res.size());
            System.out.println("Company List: "); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Company>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("There is no companies!"); // return to backend
        System.out.println();
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("There is no companies!", HttpStatus.BAD_REQUEST);
        return responseWrapper;
    }


    // Find company by ID
    // Working + test if exist + postman
    @GetMapping("/findCompanyById/{id}")  // http://localhost:8080/CouponApp/findCompanyById/id
    @ResponseBody
    public ResponseEntity<?> getCompanyById(@PathVariable int id) throws Exception {
        Company res = adminService.findCompanyById(id);
        if (res != null) {
            System.out.println("Company from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<Company> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No company exist by this ID: " + id); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("No company exist by this ID: " + id, HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }


    // Add Customer
    //JSON:
    //  {
    //    "firstName": "enterFirstName",
    //    "lastName": "enterLastName",
    //    "email": "enterEmail",
    //    "password": "enterPassword"
    //  }
    @PostMapping("/addCustomer")
    @ResponseBody
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) throws Exception { // http://localhost:8080/CouponApp/addCustomer
        Customer res = adminService.addCustomer(customer); //main function.
        if (res != null) {
            System.out.println("Customer added successfully!"); // print to backend
            System.out.println(customer);
            ResponseEntity<?> response = new ResponseEntity<>("Customer added successfully! " + customer, HttpStatus.OK); // print to the client
            return response;
        } else {
            System.out.println("Cant add customer - email already exist."); // print to backend
            ResponseEntity<String> response = new ResponseEntity<>("Cant add customer - email already exist.", HttpStatus.BAD_REQUEST); // print to the client
            return response;
        }
    }


    // Update customer
    // id = customer to update, firstName = update to new firstName, lastName = update to new lastName
    // email = update to new email, password = update to new password
    @PutMapping("/updateCustomer/{id}")
    @ResponseBody
    public ResponseEntity<?> updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) throws Exception { // http://localhost:8080/CouponApp/updateCustomer/{id}
        if (adminService.findCustomerById(id) != null) {
            adminService.updateCustomer(id, customer.getFirstName(), customer.getLastName(), customer.getEmail(), customer.getPassword());
            System.out.println("Customer updated successfully! " + adminService.findCustomerById(id)); // print to backend
            ResponseEntity<?> response = new ResponseEntity<>("Customer updated successfully! " + adminService.findCustomerById(id), HttpStatus.OK);
            return response;
        }
        System.out.println("No customer exist by this ID: " + id); //print to backend
        ResponseEntity<?> response = new ResponseEntity<>("No customer exist by this ID: " + id, HttpStatus.BAD_REQUEST);
        return response;
    }


    // Delete customer by ID
    // Working + if exist + postman
    @DeleteMapping("deleteCustomer/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteCustomer(@PathVariable int id) throws Exception { // http://localhost:8080/CouponApp/deleteCustomer/{id}
        if (adminService.findCustomerById(id) != null) {
            adminService.deleteCustomerById(id);
            System.out.println("Customer deleted Successfully!"); // print to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("Customer deleted successfully! ", HttpStatus.OK); // print to client
            return responseWrapper;
        }
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("No customer exist by this ID: "+id, HttpStatus.BAD_REQUEST); // print to client
        System.out.println("Error, no customer exist by this ID: " + id); // print to backend
        System.out.println();
        return responseWrapper;
    }


    // Get all customers
    // Working + if exist + postman
    @GetMapping("/getAllCustomers") // http://localhost:8080/CouponApp/getAllCustomers
    @ResponseBody
    public ResponseEntity<?> getAllCustomers() {
        List<Customer> res = adminService.getAllCustomers(); //main function.
        if (!res.isEmpty()) {
            System.out.println("Customer's List: "); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<?>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        ResponseEntity<String> responseWrapper = new ResponseEntity<>("There is no customers!", HttpStatus.BAD_REQUEST);
        return responseWrapper;
    }


    // Find customer by ID
    // Working + if exist + postman
    @GetMapping("/findCustomerById/{id}")  // http://localhost:8080/CouponApp/findCustomerById/{id}
    @ResponseBody
    public ResponseEntity<?> getCustomerById(@PathVariable int id) throws Exception {
        Customer res = adminService.findCustomerById(id);
        if (res != null) {
            System.out.println("Customer from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<Customer> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No customer exist by this ID: " + id); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("No customer exist by this ID: "+id, HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }


    //get all specific coupons with given category
    @GetMapping("/findAllCouponsByCategory/{category}")
    @ResponseBody
    public ResponseEntity<?> findCouponsByCategory(@PathVariable Category category) throws Exception { // http://localhost:8080/CouponApp/findAllCouponsByCategory/{category}
        List<Coupon> res = adminService.findCouponsByCategory(category);
        if (!res.isEmpty()) {
            System.out.println("All coupons from DB with category: " + category.toString().toLowerCase()); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Coupon>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;
        }
        System.out.println("No coupons exist by this category: " + category.toString().toLowerCase()); // return to backend
        System.out.println();
        ResponseEntity<?> responseWrapper = new ResponseEntity<>("No coupons exist by this category: " + category.toString().toLowerCase(), HttpStatus.BAD_REQUEST); // return to client
        return responseWrapper;
    }
}

