package com.CouponsProject2.service;


import com.CouponsProject2.repository.CompaniesRepository;
import com.CouponsProject2.repository.CouponsRepository;
import com.CouponsProject2.repository.CustomerRepository;
import com.CouponsProject2.repository.Customer_vs_coupons_repository;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.SQLException;

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

