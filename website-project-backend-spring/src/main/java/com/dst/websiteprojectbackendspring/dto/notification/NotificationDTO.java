package com.dst.websiteprojectbackendspring.dto.notification;

import java.time.LocalDateTime;

public record NotificationDTO(Long id, String message, String notificationContentTitle, String link, LocalDateTime createdAt, boolean isRead, Long userId) {
}
