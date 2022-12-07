package com.CouponsProject.CouponSystemEntities;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "customer_vs_coupons")
@Builder
public class Customer_vs_coupons {

    @Id
    @GeneratedValue
    private int id;

    @NonNull
    private int customerID;

    @NonNull
    private int couponID;
}
