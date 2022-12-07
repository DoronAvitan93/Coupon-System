package com.CouponsProject.service;

import com.CouponsProject.CouponSystemEntities.Category;
import com.CouponsProject.CouponSystemEntities.Company;
import com.CouponsProject.CouponSystemEntities.Coupon;
import com.CouponsProject.CouponSystemEntities.Customer;

import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

//Business Logic

@Data
@Service
public class AdminService extends ClientServiceAbs {

    /////////////// COMPANY FUNCTIONS /////////////

    // Add Company
    public Company addCompany(Company company) {
        try {
            //checking if company name already exist
            if (companiesRepository.findByName(company.getName()) == null) {
                //checking if company email already exist
                if (companiesRepository.findByEmail(company.getEmail()) == null) {
                    return companiesRepository.save(company);
                }
            }
            System.out.println("Company already exist!");
            return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    // Update Company
    public Company updateCompany(Company company) {
        try {
            //company that will be updated
            Company resUpdateCompany = companiesRepository.findById(company.getId());
            //checking if email is already exist before updating
            if (companiesRepository.findByEmail(company.getEmail()) == null) {
                resUpdateCompany.setEmail(company.getEmail());
                resUpdateCompany.setPassword(company.getPassword());
                companiesRepository.save(resUpdateCompany);
                return resUpdateCompany;
            } else {
                return null;
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Delete company by ID
    public void deleteCompanyById(int id) {
        try {
            if (companiesRepository.findById(id) != null) {
                companiesRepository.deleteById(id);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Get all companies
    public List<Company> getAllCompanies() {
        return companiesRepository.findAll();
    }


    //Get company by ID
    public Company findCompanyById(int id) {
        try {
            return companiesRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    ///////////// CUSTOMER FUNCTIONS /////////////


    //Add customer
    public Customer addCustomer(Customer customer) {
        try {
            //checking if customer email exist already.
            if (customerRepository.findByEmail(customer.getEmail()) == null) {
                return customerRepository.save(customer);
            }
            System.out.println("Customer email already exist!");
            return null;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Update customer
    public void updateCustomer(int id, String firstName, String lastName, String email, String password) {
        try {
            Customer updateCustomer = customerRepository.findById(id);
            updateCustomer.setFirstName(firstName);
            updateCustomer.setLastName(lastName);
            updateCustomer.setEmail(email);
            updateCustomer.setPassword(password);
            customerRepository.save(updateCustomer);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Get customer by ID
    public Customer findCustomerById(int id) {
        try {
            return customerRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Delete customer by ID
    //@Transactional
    public void deleteCustomerById(int id) {
        try {
            if (customerRepository.findById(id) != null) {
                customer_vs_coupons_repository.deleteByCustomerID(id);
                customerRepository.deleteById(id);

            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Get all customers
    public List<Customer> getAllCustomers() {
        try {
            return customerRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Find all coupons by category
    public List<Coupon> findCouponsByCategory(Category category) {
        try {

            return couponsRepository.findByCategory(category);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    //Delete all DB
    public void deleteAll() {
        companiesRepository.deleteAll();
        customerRepository.deleteAll();
        couponsRepository.deleteAll();
        customer_vs_coupons_repository.deleteAll();
    }
}
