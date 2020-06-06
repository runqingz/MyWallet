package com.runz.pmtool.services;

import com.runz.pmtool.domain.Backlog;
import com.runz.pmtool.domain.Project;
import com.runz.pmtool.domain.Task;
import com.runz.pmtool.exceptions.BacklogException;
import com.runz.pmtool.exceptions.TaskException;
import com.runz.pmtool.repositories.BacklogRepository;
import com.runz.pmtool.repositories.ProjectRepository;
import com.runz.pmtool.repositories.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Task addTask(String projectIdentifier, Task task) {
        try {
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
        } catch (Exception e) {
            throw new BacklogException("Cannot find backlog of project of ID: " + projectIdentifier.toUpperCase());
        }        

        return taskRepository.save(task);
    }

    public Iterable<Task> findAllTasksById(String backlog_id) {
        Project project = projectRepository.findByProjectIdentifier(backlog_id);

        if (project == null) {
            throw new BacklogException("Project with ID: " + backlog_id.toUpperCase() + " does not exist!");
        }

        return taskRepository.findByProjectIdentifierOrderByPostDate(backlog_id);
    }

    public Task findTaskByProjectSequence(String backlog_id, String sequnce) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);

        if (backlog == null) {
            throw new BacklogException("Backlog with project id: " + backlog_id.toUpperCase() + " does not exist!");
        }

        Task task = taskRepository.findByProjectSquence(sequnce.toUpperCase());

        if (task == null) {
            throw new TaskException("Task with id: " + sequnce.toUpperCase() + " does not exist!");
        }

        return task;
    }

    public Task updateTaskByProjectSequence(Task updatedTask, String backlog_id, String projectSequence) {
        Task task = findTaskByProjectSequence(backlog_id, projectSequence);

        task = updatedTask;

        return taskRepository.save(task);
    }

    public void deleteTaskByProjectSequence(String backlog_id, String projectSequence) {
        Task task = findTaskByProjectSequence(backlog_id, projectSequence);

        taskRepository.delete(task);
    }
  
}
