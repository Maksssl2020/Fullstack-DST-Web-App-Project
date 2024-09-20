package com.dst.websiteprojectbackendspring.dto.social_media_link;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class SocialMediaLinkRequest {

    String socialMediaName;
    String url;
}
