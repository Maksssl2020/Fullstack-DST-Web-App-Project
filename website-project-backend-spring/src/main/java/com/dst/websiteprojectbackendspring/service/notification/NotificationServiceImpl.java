package com.dst.websiteprojectbackendspring.service.notification;

import com.dst.websiteprojectbackendspring.model.notification.Notification;
import com.dst.websiteprojectbackendspring.model.notification.NotificationRequest;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.repository.NotificationRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public void sendNotification(NotificationRequest notificationRequest) {
        List<User> allUsers = userRepository.findAll();

        allUsers.forEach(user -> {
            Notification notification = new Notification();
            notification.setMessage(notificationRequest.message());
            notification.setNotificationContentTitle(notificationRequest.notificationContentTitle());
            notification.setLink(notificationRequest.link());
            notification.setCreatedAt(LocalDateTime.now());
            notification.setRead(false);
            notification.setUser(user);

            notificationRepository.save(notification);
        });
    }

    @Override
    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findAllByUserId(userId);
    }

    @Override
    public Long getAmountOfNonReadNotificationsByUserId(Long userId) {
        return notificationRepository.findAllByUserId(userId)
                .stream()
                .filter(notification -> !notification.isRead())
                .count();
    }

    @Override
    public void setUserNotificationAsRead(Long notificationId) {
        try {
            Notification notification = notificationRepository.findById(notificationId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            notification.setRead(true);
            notificationRepository.save(notification);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
