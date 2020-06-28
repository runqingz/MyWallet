package com.runz.pmtool.repositories;

import java.util.Optional;

import com.runz.pmtool.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long>{
    
    User findByUsername(String username);

    Optional<User> findById(Long id);
}