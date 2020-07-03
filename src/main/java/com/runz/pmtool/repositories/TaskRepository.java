package com.runz.pmtool.repositories;

import java.util.List;

import com.runz.pmtool.domain.Task;
import com.runz.pmtool.domain.TaskStatus;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long>{

    List<Task> findByProjectIdentifierOrderByPostDate(String id);
    
    List<Task> findByProjectIdentifierAndStatus(String id, TaskStatus status);

	Task findByProjectSquence(String squence);
}
