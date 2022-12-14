package com.CouponsProject.service;

import com.CouponsProject.CouponSystemEntities.Category;
import com.CouponsProject.CouponSystemEntities.Coupon;
import com.CouponsProject.CouponSystemEntities.Customer;
import com.CouponsProject.CouponSystemEntities.Customer_vs_coupons;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//Business Logic

@EqualsAndHashCode(callSuper = true)
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
            //check if customer already bought the coupon he's going to buy
            if (customer_vs_coupons_repository.findByCustomerIDAndCouponID(customer.getId(), coupon.getId()) == null) {
                //check if there is enough from this coupon right now
                if (coupon.getAmount() > 0) {
                    //check if coupon does not expire yet
                    if (coupon.getEndDate().isAfter(LocalDate.now())) {
                        //-1 the amount of the coupon
                        coupon.setAmount(coupon.getAmount() - 1);
                        //updating the coupon (-1 amount)
                        couponsRepository.save(coupon);
                        //save coupon to DB with the customer ID (purchasing)
                        customer_vs_coupons_repository.save(Customer_vs_coupons.builder().couponID(coupon.getId()).customerID(customer.getId()).build());
                        return 0;

                    } else {
//                        System.out.println("Error - Coupon date expired!");
//                        System.out.println();
                        return 1;
                    }
                } else {
//                    System.out.println("Error - Coupon amount is < 0!");
//                    System.out.println();
                    return 2;
                }
            } else {
//                System.out.println("Error - cant purchase coupon twice!");
//                System.out.println();
                return 3;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Get all customer coupons
    public List<Coupon> getAllCostumerCoupons(int customerID) {

        //list with all coupons ID that the customer have
        List<Customer_vs_coupons> customerCouponsIDs = customer_vs_coupons_repository.findByCustomerID(customerID);
        List<Coupon> fullCustomerCoupons = new ArrayList<>();

        //making a new list with all coupons details
        for (Customer_vs_coupons c : customerCouponsIDs) {
            Coupon customerCouponToList = couponsRepository.findById(c.getCouponID());
            fullCustomerCoupons.add(customerCouponToList);
        }
        return fullCustomerCoupons;
    }


    //Get all customer coupons by category
    public List<Coupon> getAllCostumerCouponsWithCategory(int customerID, Category category) {

        //list with all coupons ID that the customer have
        List<Customer_vs_coupons> customerCoupons = customer_vs_coupons_repository.findByCustomerID(customerID);
        List<Coupon> fullDetailsCustomerCoupons = new ArrayList<>();

        //making a new list with all coupons details
        for (Customer_vs_coupons c : customerCoupons) {
            Coupon customerCouponToList = couponsRepository.findById(c.getCouponID());
            fullDetailsCustomerCoupons.add(customerCouponToList);
        }
        //sorting coupons by selected Category
        return fullDetailsCustomerCoupons.stream().filter(coupon -> coupon.getCategory() == category).collect(Collectors.toList());
    }


    //Get all customer coupons by price
    public List<Coupon> getAllCostumerCouponsWithMaxPrice(int customerID, int price) {

        //list with all coupons ID that the customer have
        List<Customer_vs_coupons> customerCoupons = customer_vs_coupons_repository.findByCustomerID(customerID);
        List<Coupon> fullDetailsCustomerCoupons = new ArrayList<>();

        //making a new list with all coupons details
        for (Customer_vs_coupons c : customerCoupons) {
            Coupon customerCouponToList = couponsRepository.findById(c.getCouponID());
            fullDetailsCustomerCoupons.add(customerCouponToList);
        }
        //sorting coupons by selected Price
        return fullDetailsCustomerCoupons.stream().filter(coupon -> coupon.getPrice() <= price).collect(Collectors.toList());
    }
}

