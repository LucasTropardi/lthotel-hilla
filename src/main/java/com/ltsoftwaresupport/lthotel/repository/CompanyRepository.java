package com.ltsoftwaresupport.lthotel.repository;

import com.ltsoftwaresupport.lthotel.model.City;
import com.ltsoftwaresupport.lthotel.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long>, JpaSpecificationExecutor<Company> {
    @Query("SELECT c FROM Company c WHERE LOWER(c.razaoSocial) LIKE LOWER(CONCAT('%', :razaoSocial, '%'))")
    List<Company> findByRazaoSocialContainingIgnoreCase(String razaoSocial);
}
