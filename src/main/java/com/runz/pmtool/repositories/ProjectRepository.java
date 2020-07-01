package com.runz.pmtool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.runz.pmtool.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    @Override
    Iterable<Project> findAll();
    Iterable<Project> findAllByCreator(String username);

    Project findByProjectIdentifier(String identifier);

}
