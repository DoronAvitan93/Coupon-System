package com.CouponsProject2.repository;

import com.CouponsProject2.CouponSystemEntities.Category;
import com.CouponsProject2.CouponSystemEntities.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Repository
public interface CouponsRepository extends JpaRepository<Coupon, Integer> {


    // Add coupon
    Coupon save(Coupon coupon);

    // Delete coupon
    @Transactional
    Coupon deleteById(int id);

    // Find coupon by title
    List<Coupon> findByTitle(String title);

    // Find coupon by ID
    Coupon findById(int id);

    // Find coupons by company ID
    List<Coupon> findByCompanyId(int companyId);

    // Find company coupons by category
    List<Coupon> findByCompanyIdAndCategory(int companyID, Category category);

    // Find company coupons by category
    List<Coupon> findByCategory(Category category);

    // Find company coupons by max price
    List<Coupon> findByCompanyIdAndPriceLessThanEqual(int companyID, double price);

    // Find company coupons that before end date
    List<Coupon> findByEndDateBefore(LocalDate localDate);


}
