package com.ltsoftwaresupport.lthotel.repository;

import com.ltsoftwaresupport.lthotel.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    @Query("SELECT c FROM City c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<City> findByNameContainingIgnoreCase(String name);
}
