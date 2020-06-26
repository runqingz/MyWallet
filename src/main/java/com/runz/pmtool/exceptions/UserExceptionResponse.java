package com.runz.pmtool.exceptions;

public class UserExceptionResponse {
    private String userError;

    public UserExceptionResponse(String userError) {
        this.userError = userError;
    }

    public String getUserError() {
        return userError;
    }

    public void setUserError(String userError) {
        this.userError = userError;
    }
}
