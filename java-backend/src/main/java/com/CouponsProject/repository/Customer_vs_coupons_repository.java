package com.CouponsProject2.repository;

import com.CouponsProject2.CouponSystemEntities.Customer_vs_coupons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface Customer_vs_coupons_repository extends JpaRepository<Customer_vs_coupons, Integer> {

    // Add coupon purchase
    Customer_vs_coupons save(Customer_vs_coupons customer_vs_coupons);

    // Find coupon purchased by customer
    Customer_vs_coupons findByCustomerIDAndCouponID(int customerID, int CouponID);

    // Find purchased coupons by
    List<Customer_vs_coupons> findByCustomerID(int customerID);

    @Transactional

    // Delete coupon purchased by customer
    List<Customer_vs_coupons> deleteByCustomerID(int id);
}
