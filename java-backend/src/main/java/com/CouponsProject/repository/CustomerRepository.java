package com.CouponsProject.repository;

import com.CouponsProject.CouponSystemEntities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    // Add customer
    Customer save(Customer customer);

    // Find customer by first name
    List<Customer> findByFirstName(String name);

    // Find customer by mail
    Customer findByEmail(String email);

    // Find customer by mail and password
    Customer findByEmailAndPassword(String email, String password);

    // Find customer by ID
    Customer findById(int id);

    // Find all customers
    List<Customer> findAll();

    // Delete customer by ID
    Customer deleteById(int id);

}
