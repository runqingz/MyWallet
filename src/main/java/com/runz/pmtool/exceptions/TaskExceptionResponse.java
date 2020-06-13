package com.runz.pmtool.exceptions;

public class TaskExceptionResponse {
    private String taskService;

    public TaskExceptionResponse(String taskService) {
        this.taskService = taskService;
    }

    public String getTaskService() {
        return taskService;
    }

    public void setTaskService(String taskService) {
        this.taskService = taskService;
    }
}
