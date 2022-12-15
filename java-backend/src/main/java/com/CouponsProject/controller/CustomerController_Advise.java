package com.CouponsProject.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice(basePackageClasses = {CustomerClientController.class})
@RestController

public class CustomerController_Advise {

    //Catching errors from the controller
    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<ErrorDetails> handle(Exception e) {
        ErrorDetails error = new ErrorDetails("Custom Error", e.getMessage());
        System.out.println(e); // print to backend
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST); // print to client
    }
}
