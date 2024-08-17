package com.dst.websiteprojectbackendspring.dto.notification;

import com.dst.websiteprojectbackendspring.model.notification.Notification;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class NotificationDTOMapper implements Function<Notification, NotificationDTO> {
    @Override
    public NotificationDTO apply(Notification notification) {
        return new NotificationDTO(notification.getId(), notification.getMessage(), notification.getNotificationContentTitle(), notification.getLink(), notification.getCreatedAt(), notification.isRead(), notification.getUser().getId());
    }
}
