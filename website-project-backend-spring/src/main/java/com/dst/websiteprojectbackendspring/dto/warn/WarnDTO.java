package com.dst.websiteprojectbackendspring.dto.warn;

import java.time.LocalDateTime;

public record WarnDTO(Long warnId, String author, String message, LocalDateTime createdAt, boolean isRead, Long userId) {
}
