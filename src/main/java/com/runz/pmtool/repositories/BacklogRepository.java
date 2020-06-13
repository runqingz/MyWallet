package com.runz.pmtool.repositories;

import com.runz.pmtool.domain.Backlog;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BacklogRepository extends CrudRepository<Backlog, Long>{
  
    Backlog findByProjectIdentifier(String projectIdentifier);
}
