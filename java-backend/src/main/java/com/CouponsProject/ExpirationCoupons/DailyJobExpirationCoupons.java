package com.CouponsProject.ExpirationCoupons;

import com.CouponsProject.CouponSystemEntities.Coupon;
import com.CouponsProject.repository.CouponsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DailyJobExpirationCoupons extends Thread {


    @Autowired
    private CouponsRepository couponsRepository;

    private DailyJobExpirationCoupons() {
        super();
    }


    @Override
    public void run() {
        while (true) {
            try {
                System.out.println();
                System.out.println("Daily job has  started!");

                //Finding coupons that their date is before the local date (now)
                List<Coupon> allExpiredCoupons = couponsRepository.findByEndDateBefore(LocalDate.now());
                if (!allExpiredCoupons.isEmpty()) {
                    System.out.println("All expired coupons: )" + allExpiredCoupons);

                    for (Coupon c : allExpiredCoupons) {
                        couponsRepository.deleteById(c.getId());
                        System.out.println("Expired coupons deleted successfully!");
                        System.out.println();
                    }
                    //1000ms * 60 = 1 minutes * 60 = 60 minutes * 24 = 24 hours - one day
                    allExpiredCoupons.clear();
                    Thread.sleep(1000 * 60 * 60 * 24);


                } else {
                    System.out.println("There is no expired coupons.");
                    System.out.println("Daily job has ended, will run again in 24h, please proceed.");
                    System.out.println();
                    //1000ms * 60 = 1 minutes * 60 = 60 minutes * 24 = 24 hours - one day
                    Thread.sleep(1000 * 60 * 60 * 24);
                }

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}
