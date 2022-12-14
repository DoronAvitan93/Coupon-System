package com.CouponsProject.service;

import com.CouponsProject.CouponSystemEntities.Category;
import com.CouponsProject.CouponSystemEntities.Company;
import com.CouponsProject.CouponSystemEntities.Coupon;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.stereotype.Service;

import java.util.List;

//Business Logic
@EqualsAndHashCode(callSuper = true)
@Data
@Service
public class CompanyService extends ClientServiceAbs {

    private int companyID;


    ///////////// COUPON FUNCTIONS /////////////

    //Add coupon
    public Coupon addCoupon(Coupon coupon) {
        try {
            //check if there is coupon with the same input Title
            if (couponsRepository.findByTitle(coupon.getTitle()).isEmpty()) {
                //save coupon to DB
                couponsRepository.save(coupon);
                return coupon;
            } else {
                //if there is input Title already - then check if the company added the coupon already with this Title.
                if (couponsRepository.findByCompanyId(coupon.getCompany().getId()) == null) {
                    //save coupon to DB
                    couponsRepository.save(coupon);
                    return coupon;
                }
//                System.out.println("Coupon already exist!");
                return null;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    // Update coupon
    public void updateCoupon(Coupon coupon) {
        try {
            Coupon resUpdateCoupon = couponsRepository.findById(coupon.getId());
            resUpdateCoupon.setTitle(coupon.getTitle());
            resUpdateCoupon.setCategory(coupon.getCategory());
            resUpdateCoupon.setDescription(coupon.getDescription());
            resUpdateCoupon.setStartDate(coupon.getStartDate());
            resUpdateCoupon.setEndDate(coupon.getEndDate());
            resUpdateCoupon.setAmount(coupon.getAmount());
            resUpdateCoupon.setPrice(coupon.getPrice());
            resUpdateCoupon.setImage(coupon.getImage());
            couponsRepository.save(resUpdateCoupon);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Find company coupons by company ID
    public List<Coupon> findByCompanyId(int companyID) {
        try {
            return couponsRepository.findByCompanyId(companyID);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Find company coupons by companyId and Category
    public List<Coupon> findByCompanyIdAndCategory(int companyID, Category category) {
        try {
            return couponsRepository.findByCompanyIdAndCategory(companyID, category);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Find company coupons by max price
    public List<Coupon> findByCompanyIDAndPriceLessThanEqual(int companyID, double price) {
        try {
            return couponsRepository.findByCompanyIdAndPriceLessThanEqual(companyID, price);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Find coupon by ID
    public Coupon findCouponById(int id) {
        try {
            if (couponsRepository.findById(id) != null) {
                return couponsRepository.findById(id);
            } else {
                return null;
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Delete coupon
    public void deleteCouponById(int id) {
        try {
            couponsRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Get company by ID
    public Company getCompanyById(int companyID) {
        try {
            return companiesRepository.findById(companyID);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}



