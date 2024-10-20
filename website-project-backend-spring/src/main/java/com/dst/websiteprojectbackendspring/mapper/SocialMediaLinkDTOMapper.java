package com.dst.websiteprojectbackendspring.mapper;

import com.dst.websiteprojectbackendspring.dto.social_media_link.SocialMediaLinkDTO;
import com.dst.websiteprojectbackendspring.model.social_media_link.SocialMediaLink;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SocialMediaLinkDTOMapper {

    private final ModelMapper modelMapper;

    public SocialMediaLinkDTO mapSocialMediaLinkIntoSocialMediaLinkDTO(SocialMediaLink socialMediaLink) {
        return modelMapper.map(socialMediaLink, SocialMediaLinkDTO.class);
    }
}
