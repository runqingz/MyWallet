package com.runz.pmtool.services;

import java.util.Date;
import java.util.List;

import com.runz.pmtool.customResponse.StatisticsResponse;
import com.runz.pmtool.domain.Backlog;
import com.runz.pmtool.domain.Task;
import com.runz.pmtool.domain.User;
import com.runz.pmtool.domain.Task.TaskStatus;
import com.runz.pmtool.domain.Task.TaskType;
import com.runz.pmtool.exceptions.BacklogException;
import com.runz.pmtool.exceptions.TaskException;
import com.runz.pmtool.repositories.TaskRepository;
import com.runz.pmtool.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository;

    public Task addTask(String projectIdentifier, Task task, String username) {

        Backlog backlog = projectService.findByProjectIdentifier(projectIdentifier, username).getBacklog();
        task.setBacklog(backlog);
        Integer sequence = backlog.getTaskSequence();
        sequence++;
        task.setProjectSquence(projectIdentifier + "-" + sequence);
        backlog.setTaskSequence(sequence);
        task.setProjectIdentifier(projectIdentifier);

        User user = userRepository.findByUsername(username);
        task.setUser(user);
        
        if(task.getStatus() == null) {
            task.setStatus(TaskStatus.POSTED);
        }     
        
        if(task.getType() == null) {
            task.setType(TaskType.OTHER);
        }

        return taskRepository.save(task);
    }

    public List<Task> findAllTasksById(String backlog_id, String username) {
        projectService.findByProjectIdentifier(backlog_id, username);

        return taskRepository.findByProjectIdentifierOrderByPostDate(backlog_id);
    }

    public List<Task> findAllTasksByIdAndStatus(String backlog_id, TaskStatus status, String username) {
        projectService.findByProjectIdentifier(backlog_id, username);

        return taskRepository.findByProjectIdentifierAndStatus(backlog_id, status);
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

        if(task.getStatus() == null) {
            task.setStatus(TaskStatus.POSTED);
        }     
        
        if(task.getType() == null) {
            task.setType(TaskType.OTHER);
        }

        return taskRepository.save(task);
    }

    public void deleteTaskByProjectSequence(String backlog_id, String projectSequence, String username) {
        Task task = findTaskByProjectSequence(backlog_id, projectSequence, username);

        taskRepository.delete(task);
    }

    public Double sumTaskValueById(String backlog_id, TaskStatus status, String username) {
        //Not sure the performance of doing this vs using aggragation querys (But this requires task to store user info/ join tables)
        List<Task> tasks = status == null ? findAllTasksById(backlog_id, username) : findAllTasksByIdAndStatus(backlog_id, status, username);

        return tasks.stream().reduce(0.0, (partialValueSum, task) -> partialValueSum + task.getValue(), Double::sum);
    }

    public StatisticsResponse userMontlyReport(String username) {
        User user = userRepository.findByUsername(username);
        Long userId = user.getId();
        Date date = new Date();

        StatisticsResponse stats = new StatisticsResponse();

        stats.setIncomes(taskRepository.findMonthlyIncomeSumByUserGroupByDayList(userId, TaskStatus.POSTED, date));
        stats.setExpenses(taskRepository.findMonthlyExpenseSumByUserGroupByDayList(userId, TaskStatus.POSTED, date));

        Double totalIncome = taskRepository.findMonthlyIncomeSumByUser(userId, TaskStatus.POSTED, date);
        if(totalIncome != null) stats.setTotalIncome(totalIncome);

        Double totalExpense = taskRepository.findMonthlyExpenseSumByUser(userId, TaskStatus.POSTED, date);
        if(totalExpense != null) stats.setTotalExpense(totalExpense);

        return stats;
    }
}
