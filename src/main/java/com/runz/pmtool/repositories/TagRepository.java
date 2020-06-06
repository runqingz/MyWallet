package com.runz.pmtool.repositories;

import com.runz.pmtool.domain.Tag;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends CrudRepository<Tag, Long>{
  
}
