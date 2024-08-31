package com.dst.websiteprojectbackendspring.model.message;

import jakarta.annotation.Nullable;

public record MessageRequest(String author, String message, String messageType, @Nullable Long requestId) {
}