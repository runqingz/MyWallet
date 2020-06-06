package com.runz.pmtool.exceptions;

public class ProjectIdExceptionResponse {

    private String projectService;

    public ProjectIdExceptionResponse(String projectService) {
        this.projectService = projectService;
    }

    public String getProjectService() {
        return this.projectService;
    }

    public void setProjectService(String projectService) {
        this.projectService = projectService;
    }
}
