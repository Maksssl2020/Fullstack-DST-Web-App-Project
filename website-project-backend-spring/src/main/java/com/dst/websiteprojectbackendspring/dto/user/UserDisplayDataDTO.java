package com.dst.websiteprojectbackendspring.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDisplayDataDTO {
    private String username;
    private String avatar;
    private String identifyPhoto;
}
