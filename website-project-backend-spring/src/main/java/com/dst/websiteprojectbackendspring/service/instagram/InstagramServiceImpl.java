package com.dst.websiteprojectbackendspring.service.instagram;

import com.dst.websiteprojectbackendspring.model.instagram.InstagramMediaDataResponse;
import com.dst.websiteprojectbackendspring.model.instagram.InstagramUserDataResponse;
import com.dst.websiteprojectbackendspring.model.instagram.MediaData;
import com.dst.websiteprojectbackendspring.model.instagram.MediaImage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InstagramServiceImpl implements InstagramService {

    private final WebClient webClient;

    @Value("${instagram.access-token}")
    private String ACCESS_TOKEN;

    @Override
    public Mono<InstagramUserDataResponse> getInstagramUserData() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("graph.instagram.com")
                        .path("/me")
                        .queryParam("fields", "username,followers_count,media_count")
                        .queryParam("access_token", ACCESS_TOKEN)
                        .build())
                .retrieve()
                .bodyToMono(InstagramUserDataResponse.class);
    }

    @Override
    public Mono<List<MediaData>> getInstagramPostsData() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("graph.instagram.com")
                        .path("/me/media")
                        .queryParam("fields", "id,username,caption,media_url,permalink,media_type,like_count, comments_count")
                        .queryParam("access_token", ACCESS_TOKEN)
                        .build())
                .retrieve()
                .bodyToMono(InstagramMediaDataResponse.class)
                .map(InstagramMediaDataResponse::data);
    }

    @Override
    public Mono<List<MediaImage>> getInstagramMediaAllImages(String postId) {
        log.info(postId);
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .scheme("https")
                        .host("graph.instagram.com")
                        .path(String.format("/%s/children", postId))
                        .queryParam("fields", "media_url")
                        .queryParam("access_token", ACCESS_TOKEN)
                        .build())
                .retrieve()
                .bodyToMono(InstagramMediaDataResponse.class)
                .map(response -> response.data().stream()
                        .map(mediaData -> new MediaImage(mediaData.id(), mediaData.media_url()))
                        .collect(Collectors.toList())
                );
    }
}
