package com.runz.pmtool.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import com.runz.pmtool.domain.User;
import com.runz.pmtool.payload.LoginRequest;
import com.runz.pmtool.payload.LoginSuccessResponse;
import com.runz.pmtool.security.JwtProvider;
import com.runz.pmtool.services.MapValidationService;
import com.runz.pmtool.services.UserService;
import com.runz.pmtool.validator.UserValidator;
import static com.runz.pmtool.security.SecurityConstants.TOKEN_PREFIX;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private MapValidationService validationService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtProvider tokenProvider;

    @Autowired
    private AuthenticationManager authManager;

    @PostMapping("/login")
    public ResponseEntity<?> AuthenticateUser(@Valid @RequestBody LoginRequest request, BindingResult result) {
        ResponseEntity<?> errorMap = validationService.validateMap(result);
        if (errorMap != null) return errorMap;

        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(auth);

        return ResponseEntity.ok(new LoginSuccessResponse(true, jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = validationService.validateMap(result);
        if (errorMap != null) return errorMap;

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED); 
    }

    
}