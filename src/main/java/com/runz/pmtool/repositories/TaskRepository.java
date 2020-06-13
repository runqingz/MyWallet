package com.runz.pmtool.repositories;

import java.util.List;

import com.runz.pmtool.domain.Task;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long>{

	List<Task> findByProjectIdentifierOrderByPostDate(String id);

	Task findByProjectSquence(String squence);

    @Query("SELECT SUM(t.value) from Task t WHERE t.projectIdentifier = ?1")
    double getValueSumByProjectIdentifier(String projectIdentifer);
  
}
