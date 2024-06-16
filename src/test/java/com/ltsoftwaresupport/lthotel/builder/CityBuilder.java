package com.ltsoftwaresupport.lthotel.builder;

import com.ltsoftwaresupport.lthotel.model.City;
import com.ltsoftwaresupport.lthotel.model.State;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
public class CityBuilder {
    private City city;

    public static CityBuilder build() {
        CityBuilder cityBuilder = new CityBuilder();
        cityBuilder.city = new City();
        cityBuilder.city.setId(0L);
        cityBuilder.city.setName("City");
        cityBuilder.city.setState(new State());
        return cityBuilder;
    }

    public CityBuilder addId(Long id) {
        city.setId(id);
        return this;
    }

    public CityBuilder addName(String name) {
        city.setName(name);
        return this;
    }

    public CityBuilder addState(State state) {
        city.setState(state);
        return this;
    }

    public City now() {
        return city;
    }
}
