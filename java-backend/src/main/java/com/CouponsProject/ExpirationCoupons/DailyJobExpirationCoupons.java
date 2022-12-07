package com.CouponsProject2.ExpirationCoupons;

import com.CouponsProject2.CouponSystemEntities.Coupon;
import com.CouponsProject2.repository.CouponsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DailyJobExpirationCoupons extends Thread {

    private static DailyJobExpirationCoupons dailyJobExpirationCoupons;

    @Autowired
    private CouponsRepository couponsRepository;

    private DailyJobExpirationCoupons() {
        super();
    }

    public static DailyJobExpirationCoupons getInstance() {
        return dailyJobExpirationCoupons;
    }


    boolean quit = false;

    public void setQuit(boolean quit) {
        this.quit = quit;
    }


    @Override
    public void run() {

        while (!quit) {
            try {
                System.out.println();
                System.out.println("Daily job has  started!");

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
                    Thread.sleep(1000*60*60*24);


                } else {
                    System.out.println("There is no expired coupons.");
                    System.out.println("Daily job has ended please proceed.");
                    System.out.println();
                    //1000ms * 60 = 1 minutes * 60 = 60 minutes * 24 = 24 hours - one day
                    Thread.sleep(1000*60*60*24);
                }

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}
