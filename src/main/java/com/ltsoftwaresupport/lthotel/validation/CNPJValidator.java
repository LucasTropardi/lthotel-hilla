package com.ltsoftwaresupport.lthotel.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * @author Lucas Tropardi
 * 03 de Jul. de 2024
 */
public class CNPJValidator implements ConstraintValidator<ValidCNPJ, String> {

    @Override
    public void initialize(ValidCNPJ constraintAnnotation) {
    }

    @Override
    public boolean isValid(String cnpj, ConstraintValidatorContext context) {
        if (cnpj == null) {
            return false;
        }

        cnpj = cnpj.replaceAll("\\D", ""); // Remove caracteres não numéricos

        if (cnpj.length() != 14) {
            return false;
        }

        // Elimina CNPJs inválidos conhecidos
        if (cnpj.matches("(\\d)\\1{13}")) {
            return false;
        }

        // Validação do primeiro dígito verificador
        int[] pesos = {5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        int soma = 0;
        for (int i = 0; i < 12; i++) {
            soma += (cnpj.charAt(i) - '0') * pesos[i];
        }
        int resto = soma % 11;
        int digito1 = (resto < 2) ? 0 : 11 - resto;

        if (digito1 != (cnpj.charAt(12) - '0')) {
            return false;
        }

        // Validação do segundo dígito verificador
        pesos = new int[]{6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2};
        soma = 0;
        for (int i = 0; i < 13; i++) {
            soma += (cnpj.charAt(i) - '0') * pesos[i];
        }
        resto = soma % 11;
        int digito2 = (resto < 2) ? 0 : 11 - resto;

        return digito2 == (cnpj.charAt(13) - '0');
    }
}
