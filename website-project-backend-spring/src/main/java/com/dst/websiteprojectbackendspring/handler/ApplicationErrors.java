package com.dst.websiteprojectbackendspring.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ApplicationErrors {
    ACCOUNT_LOCKED(HttpStatus.FORBIDDEN.value(), "Account is locked!"),
    ACCOUNT_IS_NOT_ACTIVATED(HttpStatus.UNAUTHORIZED.value(), "Account isn't activated!"),
    JWT_TOKEN_EXPIRED(399, "JWT token expired!"),;

    private final int code;
    private final String message;

    ApplicationErrors(int code, String message) {
        this.code = code;
        this.message = message;
    }
}
