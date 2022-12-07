package com.CouponsProject.service;


import com.CouponsProject.repository.CompaniesRepository;
import com.CouponsProject.repository.CouponsRepository;
import com.CouponsProject.repository.CustomerRepository;
import com.CouponsProject.repository.Customer_vs_coupons_repository;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class ClientServiceAbs {

    @Autowired
    protected CompaniesRepository companiesRepository;
    @Autowired
    protected CustomerRepository customerRepository;
    @Autowired
    protected CouponsRepository couponsRepository;
    @Autowired
    protected Customer_vs_coupons_repository customer_vs_coupons_repository;
}

