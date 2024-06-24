package com.ltsoftwaresupport.lthotel.repository;

import com.ltsoftwaresupport.lthotel.model.State;
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
public interface StateRepository extends JpaRepository<State, Long> {
    @Query("SELECT s FROM State s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<State> findByNameContainingIgnoreCase(String name);
}
