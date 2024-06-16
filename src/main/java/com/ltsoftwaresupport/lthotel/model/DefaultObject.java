package com.ltsoftwaresupport.lthotel.model;

import jakarta.persistence.*;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
@MappedSuperclass
public abstract class DefaultObject {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idgenerator")
    @SequenceGenerator(name = "idgenerator", initialValue = 1000)
    private Long id = 0L;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

}
