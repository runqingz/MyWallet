package com.runz.pmtool.exceptions;

public class BacklogExceptionResponse {
    private String backlogService;

    public BacklogExceptionResponse(String backlogServiceMsg) {
        this.backlogService = backlogServiceMsg;
    }

    public String getBacklogService() {
        return backlogService;
    }

    public void setBacklogService(String backlogService) {
        this.backlogService = backlogService;
    }

    
}
