package com.runz.pmtool.validator;

import com.runz.pmtool.domain.User;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User)target;

        if(user.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must contain at least 6 characters");
        }
        
        if(!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "PassMatch", "Passwords must match");
        }
    }
    
}