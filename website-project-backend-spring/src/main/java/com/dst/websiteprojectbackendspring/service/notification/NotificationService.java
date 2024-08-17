package com.dst.websiteprojectbackendspring.service.notification;

import com.dst.websiteprojectbackendspring.dto.notification.NotificationDTO;
import com.dst.websiteprojectbackendspring.model.notification.Notification;
import com.dst.websiteprojectbackendspring.model.notification.NotificationRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NotificationService {

    void sendNotification(NotificationRequest notificationRequest);
    List<NotificationDTO> getNotificationsByUserId(Long userId);
    Long getAmountOfNonReadNotificationsByUserId(Long userId);
    void setUserNotificationAsRead(Long notificationId);
}
