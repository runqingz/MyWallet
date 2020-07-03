package com.runz.pmtool.services;

import java.util.List;

import com.runz.pmtool.domain.Backlog;
import com.runz.pmtool.domain.Project;
import com.runz.pmtool.domain.Task;
import com.runz.pmtool.domain.TaskStatus;
import com.runz.pmtool.exceptions.BacklogException;
import com.runz.pmtool.exceptions.TaskException;
import com.runz.pmtool.repositories.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectService projectService;

    public Task addTask(String projectIdentifier, Task task, String username) {

        Backlog backlog = projectService.findByProjectIdentifier(projectIdentifier, username).getBacklog();
        task.setBacklog(backlog);
        Integer sequence = backlog.getTaskSequence();
        sequence++;
        task.setProjectSquence(projectIdentifier + "-" + sequence);
        backlog.setTaskSequence(sequence);
        task.setProjectIdentifier(projectIdentifier);
        
        if(task.getStatus() == null) {
            task.setStatus(TaskStatus.POSTED);
        }       

        return taskRepository.save(task);
    }

    public List<Task> findAllTasksById(String backlog_id, String username) {
        Project project = projectService.findByProjectIdentifier(backlog_id, username);

        if (project == null) {
            throw new BacklogException("Project with ID: " + backlog_id.toUpperCase() + " does not exist!");
        }

        return taskRepository.findByProjectIdentifierOrderByPostDate(backlog_id);
    }

    public Task findTaskByProjectSequence(String backlog_id, String sequnce, String username) {
        Backlog backlog =  projectService.findByProjectIdentifier(backlog_id, username).getBacklog();

        if (backlog == null) {
            throw new BacklogException("Backlog with project id: " + backlog_id.toUpperCase() + " does not exist!");
        }

        Task task = taskRepository.findByProjectSquence(sequnce.toUpperCase());

        if (task == null) {
            throw new TaskException("Task with id: " + sequnce.toUpperCase() + " does not exist!");
        }

        return task;
    }

    public Task updateTaskByProjectSequence(Task updatedTask, String backlog_id, String projectSequence, String username) {
        Task task = findTaskByProjectSequence(backlog_id, projectSequence, username);

        task = updatedTask;

        return taskRepository.save(task);
    }

    public void deleteTaskByProjectSequence(String backlog_id, String projectSequence, String username) {
        Task task = findTaskByProjectSequence(backlog_id, projectSequence, username);

        taskRepository.delete(task);
    }

    public Double sumTaskValueById(String backlog_id, TaskStatus status, String username) {
        //TODO: if status present then find task by id by status
        List<Task> tasks = findAllTasksById(backlog_id, username);

        return tasks.stream().reduce(0.0, (partialValueSum, task) -> partialValueSum + task.getValue(), Double::sum);
    }
  
}
