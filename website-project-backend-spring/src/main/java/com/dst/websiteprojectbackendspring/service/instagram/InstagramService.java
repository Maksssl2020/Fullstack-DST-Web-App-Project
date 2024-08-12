package com.dst.websiteprojectbackendspring.service.instagram;

import com.dst.websiteprojectbackendspring.model.instagram.MediaImage;
import com.dst.websiteprojectbackendspring.model.instagram.InstagramUserDataResponse;
import com.dst.websiteprojectbackendspring.model.instagram.MediaData;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public interface InstagramService {

    Mono<InstagramUserDataResponse> getInstagramUserData();
    Mono<List<MediaData>> getInstagramPostsData();
    Mono<List<MediaImage>> getInstagramMediaAllImages(String postId);
}
