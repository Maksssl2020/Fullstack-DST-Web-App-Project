package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.instagram.InstagramUserDataResponse;
import com.dst.websiteprojectbackendspring.model.instagram.MediaData;
import com.dst.websiteprojectbackendspring.model.instagram.MediaImage;
import com.dst.websiteprojectbackendspring.service.instagram.InstagramServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/instagram")
@RequiredArgsConstructor
public class InstagramController {

    private final InstagramServiceImpl instagramService;

    @GetMapping("/user")
    public ResponseEntity<Mono<InstagramUserDataResponse>> getInstagramUserData() {
        return ResponseEntity.ok(instagramService.getInstagramUserData());
    }

    @GetMapping("/user/media")
    public ResponseEntity<Mono<List<MediaData>>> getInstagramMediaData() {
        return ResponseEntity.ok(instagramService.getInstagramPostsData());
    }

    @GetMapping("/user/{postId}/images")
    public ResponseEntity<Mono<List<MediaImage>>> getInstagramMediaImages(@PathVariable String postId) {
        return ResponseEntity.ok(instagramService.getInstagramMediaAllImages(postId));
    }
}
