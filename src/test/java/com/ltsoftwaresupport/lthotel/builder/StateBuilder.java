package com.ltsoftwaresupport.lthotel.builder;

import com.ltsoftwaresupport.lthotel.model.Country;
import com.ltsoftwaresupport.lthotel.model.State;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
public class StateBuilder {
    private State state;

    public static StateBuilder build() {
        StateBuilder stateBuilder = new StateBuilder();
        stateBuilder.state = new State();
        stateBuilder.state.setId(0L);
        stateBuilder.state.setCountry(new Country());
        stateBuilder.state.setName("State");
        return stateBuilder;
    }

    public StateBuilder addId(Long id) {
        state.setId(id);
        return this;
    }

    public StateBuilder addCountry(Country country) {
        state.setCountry(country);
        return this;
    }

    public StateBuilder addName(String name) {
        state.setName(name);
        return this;
    }

    public State now() {
        return state;
    }
}
