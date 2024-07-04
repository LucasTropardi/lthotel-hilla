package com.ltsoftwaresupport.lthotel.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author Lucas Tropardi
 * 03 de Jul. de 2024
 */
@Constraint(validatedBy = CNPJValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidCNPJ {
    String message() default "CNPJ inválido!";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}