package com.dst.websiteprojectbackendspring.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public enum UserRole {
    NON_REGISTERED(List.of(UserPermission.VIEW_WEBSITE_ONLY)),
    REGISTERED(List.of(UserPermission.CREATING_FORUM_POSTS)),
    ADMIN(List.of(UserPermission.CREATING_FORUM_POSTS, UserPermission.MANAGING_ALL_WEBSITE_DATA)),;

    private List<UserPermission> permissions;

    public void setPermissions(List<UserPermission> permissions) {
        this.permissions = permissions;
    }
}
