package com.runz.pmtool.services;

import com.runz.pmtool.domain.Backlog;
import com.runz.pmtool.domain.Task;
import com.runz.pmtool.repositories.BacklogRepository;
import com.runz.pmtool.repositories.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
  @Autowired
  private BacklogRepository backlogRepository;

  @Autowired
  private TaskRepository taskRepository;

  public Task addTask(String projectIdentifier, Task task) {
    Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

    task.setBacklog(backlog);
    Integer sequence = backlog.getTaskSequence();
    sequence++;
    task.setProjectSquence(projectIdentifier + "-" + sequence);
    backlog.setTaskSequence(sequence);
    task.setProjectIdentifier(projectIdentifier);

    if(task.getStatus() == "" || task.getStatus() == null) {
      task.setStatus("Pending");
    }

    return taskRepository.save(task);
  }

  public Iterable<Task> findAllTasksById(String backlog_id) {
  	return taskRepository.findByProjectIdentifierOrderByPostDate(backlog_id);
  }
  
}