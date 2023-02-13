package com.CouponsProject.CouponSystemEntities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Entity(name = "coupon")
@Builder
public class Coupon {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "title")
    @NonNull
    private String title;

    @Column(name = "category")
    @NonNull
    private Category category;

    @Column(name = "description")
    @NonNull
    private String description;

    @Column(name = "amount")
    @NonNull
    private int amount;

    @Column(name = "price")
    @NonNull
    private double price;

    @Column(name = "startDate")
    @NonNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Column(name = "endDate")
    @NonNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Column(name = "image")
    @NonNull
    private String image;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "companyID")
//    @JsonSerialize
    private Company company;


    @Override
    public String toString() {
        return "Coupon{" + "id=" + id + ", category=" + category + ", title='" + title + '\'' + ", description='" + description + '\'' + ", startDate=" + startDate + ", endDate=" + endDate + ", amount=" + amount + ", price=" + price + ", image='" + image + '\'' +
//                ", company=" + company +
//                ", customer=" + customer +
                '}';
    }
}
