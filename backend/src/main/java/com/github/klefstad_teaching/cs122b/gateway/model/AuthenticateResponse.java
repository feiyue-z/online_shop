package com.github.klefstad_teaching.cs122b.gateway.model;

public class AuthenticateResponse {
    private AuthenticateResult result;

    public AuthenticateResult getResult() {
        return result;
    }

    public AuthenticateResponse setResult(AuthenticateResult result) {
        this.result = result;
        return this;
    }
}
