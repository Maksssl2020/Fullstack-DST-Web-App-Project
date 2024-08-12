package com.dst.websiteprojectbackendspring.model.instagram;

public record MediaData(String id, String username, String caption, String media_url, String permalink, String media_type, int like_count, int comments_count) {
}
