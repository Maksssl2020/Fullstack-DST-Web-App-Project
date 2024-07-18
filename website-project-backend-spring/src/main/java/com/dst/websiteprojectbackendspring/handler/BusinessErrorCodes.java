package com.dst.websiteprojectbackendspring.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BusinessErrorCodes {
    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No code!"),
    ACCOUNT_LOCKED(300, HttpStatus.FORBIDDEN, "User account is locked!"),
    INCORRECT_PASSWORD(301, HttpStatus.BAD_REQUEST, "Incorrect password!"),
    NEW_PASSWORD_DOES_NOT_MATCH(302, HttpStatus.BAD_REQUEST, "New password doesn't match!"),
    INCORRECT_USERNAME(303, HttpStatus.BAD_REQUEST, "Incorrect username!"),
    ACCOUNT_DISABLED(304, HttpStatus.FORBIDDEN, "User account is disabled!"),
    BAD_CREDENTIALS(305, HttpStatus.BAD_REQUEST, "Login or password is incorrect!"),
    INCORRECT_FORUM_POST_TITLE(306, HttpStatus.BAD_REQUEST, "Incorrect forum post title!"),
    INCORRECT_FORUM_POST_CONTENT(306, HttpStatus.BAD_REQUEST, "Incorrect forum post content!"),
    ;

    private final int code;
    private final HttpStatus httpStatusCode;
    private final String description;

    BusinessErrorCodes(int code, HttpStatus httpStatusCode, String description) {
        this.code = code;
        this.httpStatusCode = httpStatusCode;
        this.description = description;
    }
}
