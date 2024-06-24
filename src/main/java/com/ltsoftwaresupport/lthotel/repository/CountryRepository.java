package com.ltsoftwaresupport.lthotel.repository;

import com.ltsoftwaresupport.lthotel.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    @Query("SELECT c FROM Country c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Country> findByNameContainingIgnoreCase(String name);
}
