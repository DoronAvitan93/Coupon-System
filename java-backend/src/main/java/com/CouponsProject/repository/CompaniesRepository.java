package com.CouponsProject.repository;

import com.CouponsProject.CouponSystemEntities.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompaniesRepository extends JpaRepository<Company, Integer> {

    //isCompanyExist
    Company findByEmailAndPassword(String email, String password);

    //find company by ID
    Company findById(int id);

    //find by name
    Company findByName(String name);

    //find company by email
    Company findByEmail(String email);

    //find all
    List<Company> findAll();

    //addCompany
    Company save(Company company);

    //delete company
    Company deleteById(int id);


}
