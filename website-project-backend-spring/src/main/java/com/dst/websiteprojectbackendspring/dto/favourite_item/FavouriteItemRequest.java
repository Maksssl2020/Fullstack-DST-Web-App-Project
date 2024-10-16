package com.dst.websiteprojectbackendspring.dto.favourite_item;

import jakarta.annotation.Nullable;

public record FavouriteItemRequest(Long mainProductId, @Nullable String size, Long userId) {
}
