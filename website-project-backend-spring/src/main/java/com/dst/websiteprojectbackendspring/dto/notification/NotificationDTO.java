package com.dst.websiteprojectbackendspring.dto.notification;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NotificationDTO {

    private Long id;
    private String message;
    private String notificationContentTitle;
    private String link;
    private LocalDateTime createdAt;
    private boolean isRead;
    private Long userId;
}
