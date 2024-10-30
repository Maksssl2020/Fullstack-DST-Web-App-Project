package com.dst.websiteprojectbackendspring.model.notification;

import com.dst.websiteprojectbackendspring.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private String notificationContentTitle;
    private String link;
    private LocalDateTime createdAt;
    private boolean isRead;

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @ManyToOne
    private User user;
}
