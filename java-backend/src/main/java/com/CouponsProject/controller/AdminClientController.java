package com.CouponsProject.controller;

import com.CouponsProject.CouponSystemEntities.Category;
import com.CouponsProject.CouponSystemEntities.Company;
import com.CouponsProject.CouponSystemEntities.Coupon;
import com.CouponsProject.CouponSystemEntities.Customer;
import com.CouponsProject.service.ClientType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
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
        System.out.println("Using login function..."); // print to backend


        // "19584413" fixed admin ID
        int adminID = loginManager.loginM(clientType, email, password);
        // checking if adminID from loginManager is the fixed ID for Admin
        if (adminID == 19584413 && clientType == ClientType.Administrator) {
            System.out.println("Admin Logged Successfully"); // print to backend
            System.out.println();
            ResponseEntity<?> responseWrapper = new ResponseEntity<>(adminID, HttpStatus.OK); // print to client
            return responseWrapper;

        } else {
            System.out.println("Admin login Error - Incorrect email / password"); // print to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("Admin login Error - incorrect email / password ", HttpStatus.BAD_REQUEST); // print to client

            return responseWrapper;
        }
    }


    //Register company
    @PostMapping("/addCompany")
    @ResponseBody
    public ResponseEntity<?> addCompany(@RequestBody Company company) { // http://localhost:8080/CouponApp/addCompany
        System.out.println("Using addCompany function..."); // print to backend

        Company res = adminService.addCompany(company);

        //check if company added successfully to the DB
        if (res != null) {
            System.out.println("Company added successfully!"); // print to backend
            System.out.println(company);
            ResponseEntity<?> response = new ResponseEntity<>("Company added successfully! " + company, HttpStatus.OK); // print to the client
            return response;

        } else {
            System.out.println("Cant add company - email or name already exist."); // print to backend
            ResponseEntity<String> response = new ResponseEntity<>("Cant add company - email or name already exist.", HttpStatus.BAD_REQUEST); // print to the client
            return response;
        }
    }


    // Update company
    // id = what company to update, email = update to new email, password = update to new password
    @PutMapping("/updateCompany/")
    @ResponseBody
    public ResponseEntity<?> updateCompany(@RequestBody Company company) { // http://localhost:8080/CouponApp/updateCompany/
        System.out.println("Using updateCompany function..."); // print to backend

        //check if company exist by id
        if (adminService.findCompanyById(company.getId()) != null) {
            //check if email exist already
            if (adminService.updateCompany(company) != null) {
                System.out.println("Company updated successfully! " + adminService.findCompanyById(company.getId())); // print to backend
                ResponseEntity<String> response = new ResponseEntity<>("Company updated successfully!", HttpStatus.OK);
                return response;

            } else {
                System.out.println("Email already exist!"); //print to backend
                ResponseEntity<String> response = new ResponseEntity<>("Email already exist!", HttpStatus.BAD_REQUEST);
                return response;
            }

        } else {
            System.out.println("No company exist by this ID: " + company.getId()); //print to backend
            ResponseEntity<String> response = new ResponseEntity("No company exist by this ID: " + company.getId(), HttpStatus.BAD_REQUEST);
            return response;
        }
    }


    // Delete company by ID
    @DeleteMapping("deleteCompanyById/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteCompanyById(@PathVariable int id) { // http://localhost:8080/CouponApp/deleteCompanyById/{id}
        System.out.println("Using deleteCompanyById function..."); // print to backend

        //check if company exist
        if (adminService.findCompanyById(id) != null) {
            //if company exist - delete it
            adminService.deleteCompanyById(id);
            System.out.println("Company & company coupons deleted Successfully!"); // print to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity("Company & company coupons deleted Successfully!", HttpStatus.OK); // print to client
            return responseWrapper;

        } else {
            ResponseEntity<String> responseWrapper = new ResponseEntity("No company exist by this ID: " + id, HttpStatus.BAD_REQUEST); // print to client
            System.out.println("Error, no company exist by this ID: " + id); // print to backend
            System.out.println();
            return responseWrapper;
        }
    }


    // Get all companies
    @GetMapping("/getAllCompanies") // http://localhost:8080/CouponApp/getAllCompanies
    @ResponseBody
    public ResponseEntity<?> getAllCompanies() {
        System.out.println("Using getAllCompanies function..."); // print to backend

        ////making a list of all companies
        List<Company> res = adminService.getAllCompanies();

        //check if there is companies
        if (!res.isEmpty()) {
            System.out.println("Companies found: " + res.size());
            System.out.println("Company List: "); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Company>> responseWrapper = new ResponseEntity(res, HttpStatus.OK);
            return responseWrapper;

        } else {
            System.out.println("There is no companies!"); // return to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity("There is no companies!", HttpStatus.BAD_REQUEST);
            return responseWrapper;
        }
    }


    // Find company by ID
    @GetMapping("/findCompanyById/{id}")  // http://localhost:8080/CouponApp/findCompanyById/id
    @ResponseBody
    public ResponseEntity<?> getCompanyById(@PathVariable int id) {
        System.out.println("Using getCompanyById function..."); // print to backend

        //creating a list for one Company - because MUI DataGrid only accept list - need to fix that
        List listForMuiDataGrid = new ArrayList<>();
        Company res = adminService.findCompanyById(id);

        //check if company exist
        if (res != null) {
            listForMuiDataGrid.add(res);
            System.out.println("Company from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Company>> responseWrapper = new ResponseEntity(listForMuiDataGrid, HttpStatus.OK);
            return responseWrapper;
        } else {
            System.out.println("No company exist by this ID: " + id); // return to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity("No company exist by this ID: " + id, HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }


    // Register Customer
    @PostMapping("/addCustomer")
    @ResponseBody
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) { // http://localhost:8080/CouponApp/addCustomer
        System.out.println("Using addCustomer function..."); // print to backend

        Customer res = adminService.addCustomer(customer);

        //check if customer already exist
        if (res != null) {
            System.out.println("Customer added successfully!"); // print to backend
            System.out.println(customer);
            ResponseEntity<String> response = new ResponseEntity("Customer added successfully!", HttpStatus.OK); // print to the client
            return response;
        } else {
            System.out.println("Cant add customer - email already exist."); // print to backend
            ResponseEntity<String> response = new ResponseEntity("Cant add customer - email already exist", HttpStatus.BAD_REQUEST); // print to the client
            return response;
        }
    }


    // Update customer
    // id = customer to update
    // firstName = update to new firstName, lastName = update to new lastName
    // email = update to new email, password = update to new password
    @PutMapping("/updateCustomer/{id}")
    @ResponseBody
    public ResponseEntity<?> updateCustomer(@PathVariable Integer id, @RequestBody Customer customer) { // http://localhost:8080/CouponApp/updateCustomer/{id}
        System.out.println("Using updateCustomer function..."); // print to backend

        //check if customer exist
        if (adminService.findCustomerById(id) != null) {
            adminService.updateCustomer(id, customer.getFirstName(), customer.getLastName(), customer.getEmail(), customer.getPassword());
            System.out.println("Customer updated successfully! " + adminService.findCustomerById(id)); // print to backend
            ResponseEntity<String> response = new ResponseEntity("Customer updated successfully!", HttpStatus.OK);
            return response;

        } else {
            System.out.println("No customer exist by this ID: " + id); //print to backend
            ResponseEntity<String> response = new ResponseEntity("No customer exist by this ID: " + id, HttpStatus.BAD_REQUEST);
            return response;
        }
    }


    // Delete customer by ID
    @DeleteMapping("deleteCustomer/{id}")
    @ResponseBody
    public ResponseEntity<?> deleteCustomer(@PathVariable int id) { // http://localhost:8080/CouponApp/deleteCustomer/{id}
        System.out.println("Using deleteCustomer function..."); // print to backend

        //check if customer exist
        if (adminService.findCustomerById(id) != null) {
            adminService.deleteCustomerById(id);
            System.out.println("Customer deleted Successfully!"); // print to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity("Customer deleted successfully!", HttpStatus.OK); // print to client
            return responseWrapper;

        } else {
            ResponseEntity<String> responseWrapper = new ResponseEntity("No customer exist by this ID: " + id, HttpStatus.BAD_REQUEST); // print to client
            System.out.println("Error, no customer exist by this ID: " + id); // print to backend
            System.out.println();
            return responseWrapper;
        }
    }


    // Get all customers
    @GetMapping("/getAllCustomers") // http://localhost:8080/CouponApp/getAllCustomers
    @ResponseBody
    public ResponseEntity<?> getAllCustomers() {
        System.out.println("Using getAllCustomers function..."); // print to backend

        //making a list of all customers
        List<Customer> res = adminService.getAllCustomers();
        //check if there is customers
        if (!res.isEmpty()) {
            System.out.println("Customer's List: "); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<?>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;

        } else {
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("There is no customers!", HttpStatus.BAD_REQUEST);
            return responseWrapper;
        }
    }


    // Find customer by ID
    @GetMapping("/findCustomerById/{id}")  // http://localhost:8080/CouponApp/findCustomerById/{id}
    @ResponseBody
    public ResponseEntity<?> getCustomerById(@PathVariable int id) {
        System.out.println("Using getCustomerById function..."); // print to backend


        //creating a list for one Company - because MUI DataGrid only accept list - need to fix that
        List listForMuiDataGrid = new ArrayList<>();
        Customer res = adminService.findCustomerById(id);

        //check if customer exist
        if (res != null) {
            listForMuiDataGrid.add(res);
            System.out.println("Customer from DB by ID: " + id); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Company>> responseWrapper = new ResponseEntity(listForMuiDataGrid, HttpStatus.OK);
            return responseWrapper;

        } else {
            System.out.println("No customer exist by this ID: " + id); // return to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity("No customer exist by this ID: " + id, HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }


    //get all specific coupons with given category
    @GetMapping("/findAllCouponsByCategory/{category}")
    @ResponseBody
    public ResponseEntity<?> findCouponsByCategory(@PathVariable Category category) { // http://localhost:8080/CouponApp/findAllCouponsByCategory/{category}
        System.out.println("Using findCouponsByCategory function..."); // print to backend

        //making a list of coupons by category
        List<Coupon> res = adminService.findCouponsByCategory(category);
        //check if coupons exist by category
        if (!res.isEmpty()) {
            System.out.println("All coupons from DB with category: " + category.toString().toLowerCase()); // print to backend
            System.out.println(res); // print to backend
            System.out.println();
            ResponseEntity<List<Coupon>> responseWrapper = new ResponseEntity<>(res, HttpStatus.OK);
            return responseWrapper;

        } else {
            System.out.println("No coupons exist by this category: " + category.toString().toLowerCase()); // return to backend
            System.out.println();
            ResponseEntity<String> responseWrapper = new ResponseEntity<>("No coupons exist by this category: " + category.toString().toLowerCase(), HttpStatus.BAD_REQUEST); // return to client
            return responseWrapper;
        }
    }
}

