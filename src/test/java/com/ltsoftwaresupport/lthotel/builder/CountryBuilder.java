package com.ltsoftwaresupport.lthotel.builder;

import com.ltsoftwaresupport.lthotel.model.Country;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
public class CountryBuilder {
    private Country country;

    public static CountryBuilder build() {
        CountryBuilder countryBuilder = new CountryBuilder();
        countryBuilder.country = new Country();
        countryBuilder.country.setId(0L);
        countryBuilder.country.setName("Country");
        countryBuilder.country.setNationality("Countryano");
        return countryBuilder;
    }

    public CountryBuilder addId(Long id) {
        country.setId(id);
        return this;
    }

    public CountryBuilder addName(String name) {
        country.setName(name);
        return this;
    }

    public CountryBuilder addNationality(String nationality) {
        country.setNationality(nationality);
        return this;
    }

    public Country now() {
        return country;
    }
}
