package com.CouponsProject.service;

import com.CouponsProject.CouponSystemEntities.Category;
import com.CouponsProject.CouponSystemEntities.Coupon;
import com.CouponsProject.CouponSystemEntities.Customer;
import com.CouponsProject.CouponSystemEntities.Customer_vs_coupons;

import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Data
@Service
public class CustomerService extends ClientServiceAbs {

    private int customerID;


    //find customer by ID
    public Customer findCustomerById(int id) {
        try {
            return customerRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Purchase coupon
    public int purchaseCoupon(Coupon coupon, Customer customer) {
        try {
            if (customer_vs_coupons_repository.findByCustomerIDAndCouponID(customer.getId(), coupon.getId()) == null) {
//                System.out.println(customer_vs_coupons_repository.findByCustomerIDAndCouponID(customer.getId(), coupon.getId())); // null
                System.out.println(coupon);
//                System.out.println("test1");
                if (coupon.getAmount() > 0) {
//                    System.out.println("test2");
                    if (coupon.getEndDate().isAfter(LocalDate.now())) {
//                        System.out.println("test3");
                        coupon.setAmount(coupon.getAmount() - 1);
                        couponsRepository.save(coupon);
                        customer_vs_coupons_repository.save(Customer_vs_coupons.builder().couponID(coupon.getId()).customerID(customer.getId()).build());
//                        System.out.println("return 0");
                        return 0;

                    } else {
                        System.out.println("Error - Coupon date expired!");
                        System.out.println();
                        return 1;
                    }
                } else {
                    System.out.println("Error - Coupon amount is < 0!");
                    System.out.println();
                    return 2;
                }
            } else {
                System.out.println("Error - cant purchase coupon twice!");
                System.out.println();
                return 3;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Get all customer coupons
    public List<Coupon> getAllCostumerCoupons(int customerID) {

        List<Customer_vs_coupons> customerCoupons = customer_vs_coupons_repository.findByCustomerID(customerID);
        List<Coupon> fullCustomerCoupons = new ArrayList<>();

        for (Customer_vs_coupons c : customerCoupons) {
            Coupon customerCouponToList = couponsRepository.findById(c.getCouponID());
            fullCustomerCoupons.add(customerCouponToList);
        }
        return fullCustomerCoupons;
    }


    //Get all customer coupons by category
    public List<Coupon> getAllCostumerCouponsWithCategory(int customerID, Category category) {

        List<Customer_vs_coupons> customerCoupons = customer_vs_coupons_repository.findByCustomerID(customerID);
        List<Coupon> fullDetailsCustomerCoupons = new ArrayList<>();

        for (Customer_vs_coupons c : customerCoupons) {
            Coupon customerCouponToList = couponsRepository.findById(c.getCouponID());
            fullDetailsCustomerCoupons.add(customerCouponToList);
        }
        List<Coupon> fullCustomerCouponsByCategory = fullDetailsCustomerCoupons.stream().filter(coupon -> coupon.getCategory() == category).collect(Collectors.toList());
        return fullCustomerCouponsByCategory;
    }


    //Get all customer coupons by price
    public List<Coupon> getAllCostumerCouponsWithMaxPrice(int customerID, int price) {
        List<Customer_vs_coupons> customerCoupons = customer_vs_coupons_repository.findByCustomerID(customerID);

        List<Coupon> fullDetailsCustomerCoupons = new ArrayList<>();
        for (Customer_vs_coupons c : customerCoupons) {
            Coupon customerCouponToList = couponsRepository.findById(c.getCouponID());
            fullDetailsCustomerCoupons.add(customerCouponToList);
        }
        List<Coupon> fullCustomerCouponsByMaxPrice = fullDetailsCustomerCoupons.stream().filter(coupon -> coupon.getPrice() <= price).collect(Collectors.toList());
        return fullCustomerCouponsByMaxPrice;
    }
}

