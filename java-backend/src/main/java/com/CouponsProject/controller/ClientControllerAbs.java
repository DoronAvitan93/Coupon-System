package com.CouponsProject.controller;

import com.CouponsProject.service.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;


public class ClientControllerAbs {

    @Autowired
    protected AdminService adminService;

    @Autowired
    protected CompanyService companyService;

    @Autowired
    protected CustomerService customerService;

    @Autowired
    protected LoginManager loginManager;


   //Template
    protected ResponseEntity<?> login(@PathVariable ClientType clientType, @PathVariable String email, @PathVariable String password) throws SQLException {
        loginManager.loginM(clientType, email, password);
        return new ResponseEntity<Integer>(HttpStatus.OK);
    }


}



