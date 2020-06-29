package com.runz.pmtool.exceptions;

public class InvalidLoginResponse {
    private String message;

    public InvalidLoginResponse(String msg) {
        this.message = msg;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
