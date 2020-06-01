package com.runz.pmtool.controller;

import javax.validation.Valid;

import com.runz.pmtool.domain.Task;
import com.runz.pmtool.services.MapValidationService;
import com.runz.pmtool.services.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
  
  @Autowired
  private TaskService taskService;

  @Autowired
  private MapValidationService mapValidationService;

  @PostMapping("/{backlog_id}")
  public ResponseEntity<?> addTaskToBacklog(@Valid @RequestBody Task task, BindingResult result, @PathVariable String backlog_id) {

    ResponseEntity<?> errorMap = mapValidationService.validateMap(result);
    if (errorMap != null) return errorMap;
    
    Task tempTask = taskService.addTask(backlog_id, task);

    return new ResponseEntity<Task>(tempTask, HttpStatus.CREATED);
  }

  @GetMapping("/{backlog_id}")
  public Iterable<Task> getBacklogTasks(@PathVariable String backlog_id) {
    return taskService.findAllTasksById(backlog_id);
  }

}