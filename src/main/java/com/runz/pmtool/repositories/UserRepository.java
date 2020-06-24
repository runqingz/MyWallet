package com.runz.pmtool.repositories;

import com.runz.pmtool.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long>{
    
}