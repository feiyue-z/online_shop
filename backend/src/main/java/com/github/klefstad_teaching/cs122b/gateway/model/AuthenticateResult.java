package com.github.klefstad_teaching.cs122b.gateway.model;

public class AuthenticateResult {
    private Integer code;
    private String message;

    public Integer getCode() {
        return code;
    }

    public AuthenticateResult setCode(Integer code) {
        this.code = code;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public AuthenticateResult setMessage(String message) {
        this.message = message;
        return this;
    }
}
