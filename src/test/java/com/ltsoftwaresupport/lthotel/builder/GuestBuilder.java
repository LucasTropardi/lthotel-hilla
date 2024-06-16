package com.ltsoftwaresupport.lthotel.builder;

import com.ltsoftwaresupport.lthotel.model.City;
import com.ltsoftwaresupport.lthotel.model.Company;
import com.ltsoftwaresupport.lthotel.model.Country;
import com.ltsoftwaresupport.lthotel.model.Guest;

import java.time.LocalDate;

/**
 * @author Lucas Tropardi
 * 16 de Jun. de 2024
 */
public class GuestBuilder {
    private Guest guest;

    public static GuestBuilder build() {
        GuestBuilder guestBuilder = new GuestBuilder();
        guestBuilder.guest = new Guest();
        guestBuilder.guest.setId(0L);
        guestBuilder.guest.setName("name");
        guestBuilder.guest.setLastname("lastname");
        guestBuilder.guest.setNationality(new Country());
        guestBuilder.guest.setEmail("email@gmail.com");
        guestBuilder.guest.setCellPhone("(18) 98988-8899");
        guestBuilder.guest.setTelephone("(18) 3652-3652");
        guestBuilder.guest.setAddress("address");
        guestBuilder.guest.setCity(new City());
        guestBuilder.guest.setProfession("profession");
        guestBuilder.guest.setCpf("123.456.789-10");
        guestBuilder.guest.setRg("12.345.678-9");
        guestBuilder.guest.setBirth(LocalDate.of(1980, 01 , 01));
        guestBuilder.guest.setMaritalStatus("single");
        guestBuilder.guest.setActive(true);
        guestBuilder.guest.setCompany(null);
        return guestBuilder;
    }

    public GuestBuilder addNationality(Country nationality) {
        guest.setNationality(nationality);
        return this;
    }

    public GuestBuilder addCity(City city) {
        guest.setCity(city);
        return this;
    }

    public GuestBuilder addCompany(Company company) {
        guest.setCompany(company);
        return this;
    }

    public Guest now() {
        return guest;
    }
}
