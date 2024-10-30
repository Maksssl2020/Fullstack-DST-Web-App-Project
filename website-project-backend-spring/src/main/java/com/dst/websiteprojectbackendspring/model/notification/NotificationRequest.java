package com.dst.websiteprojectbackendspring.model.notification;

public record NotificationRequest(String message, String notificationContentTitle, String link, String notificationType) {
}
