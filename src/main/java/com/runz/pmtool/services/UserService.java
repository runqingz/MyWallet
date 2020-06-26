package com.runz.pmtool.services;

import com.runz.pmtool.domain.User;
import com.runz.pmtool.exceptions.UserException;
import com.runz.pmtool.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        newUser.setConfirmPassword(bCryptPasswordEncoder.encode(newUser.getConfirmPassword()));

        try {
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UserException("User name: " + newUser.getUsername() + " already exists!");
        }
    }

}