package com.dst.websiteprojectbackendspring.dto.social_media_link;

import com.dst.websiteprojectbackendspring.model.social_media_link.SocialMediaLink;

import java.util.function.Function;

public class SocialMediaLinkDTOMapper implements Function<SocialMediaLink, SocialMediaLinkDTO> {
    @Override
    public SocialMediaLinkDTO apply(SocialMediaLink socialMediaLink) {
        return new SocialMediaLinkDTO(socialMediaLink.getSocialMediaName(), socialMediaLink.getUrl());
    }
}
