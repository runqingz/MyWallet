package com.runz.pmtool.repositories;

import com.runz.pmtool.domain.ItemTag;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemTagRepository extends CrudRepository<ItemTag, Long>{
  
}