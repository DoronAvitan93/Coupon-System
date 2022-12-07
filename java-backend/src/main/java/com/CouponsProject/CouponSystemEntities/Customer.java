package com.CouponsProject2.CouponSystemEntities;

import lombok.*;
import javax.persistence.*;



@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity(name = "customer")
@Builder

public class Customer {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "firstName")
    @NonNull
    private String firstName;

    @Column(name = "lastName")
    @NonNull
    private String lastName;

    @Column(name = "email")
    @NonNull
    private String email;

    @Column(name = "password")
    @NonNull
    private String password;


    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
//                ", couponsList=" + couponsList +
                '}';
    }
}
