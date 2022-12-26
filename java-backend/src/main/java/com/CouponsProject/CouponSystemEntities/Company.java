package com.CouponsProject.CouponSystemEntities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity(name = "company")
@NoArgsConstructor
@Builder
//@JsonIgnoreProperties(value = {"couponsList"}) // use this if you want to ignore coupon list when JSON company
public class Company {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "email")
    @NonNull
    private String email;

    @Column(name = "password")
    @NonNull
    private String password;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "company", cascade = CascadeType.ALL) // from coupon
    @JsonSerialize

    private List<Coupon> couponsList = new ArrayList<>();

    @Override
    public String toString() {
        return "Company{" + "id=" + id + ", name='" + name + '\'' + ", email='" + email + '\'' + ", password='" + password + '\'' + ", couponsList=" + couponsList + '}';
    }
}
