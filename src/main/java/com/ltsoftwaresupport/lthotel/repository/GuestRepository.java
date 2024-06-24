package com.ltsoftwaresupport.lthotel.repository;

import com.ltsoftwaresupport.lthotel.model.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
    @Query("SELECT g FROM Guest g WHERE LOWER(g.name) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "OR LOWER(g.lastname) LIKE LOWER(CONCAT('%', :name, '%')) " +
            "OR LOWER(CONCAT(g.name, ' ', g.lastname)) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Guest> findByNameContainingIgnoreCase(@Param("name") String name);
}
