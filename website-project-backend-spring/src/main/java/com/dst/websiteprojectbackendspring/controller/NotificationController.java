package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.notification.NotificationDTO;
import com.dst.websiteprojectbackendspring.model.notification.NotificationRequest;
import com.dst.websiteprojectbackendspring.service.notification.NotificationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationServiceImpl notificationService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<NotificationDTO>> getNotificationsByUserId(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(notificationService.getNotificationsByUserId(userId));
    }

    @GetMapping("/amount-of-non-read-notifications/{userId}")
    public ResponseEntity<Long> getAmountOfNonReadNotificationsByUserId(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(notificationService.getAmountOfNonReadNotificationsByUserId(userId));
    }

    @PostMapping("add-notification")
    public ResponseEntity<HttpStatus> addNotification(@RequestBody NotificationRequest notification) {
        notificationService.sendNotification(notification);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{notificationId}/is-read")
    public ResponseEntity<HttpStatus> isNotificationRead(@PathVariable("notificationId") Long notificationId) {
        notificationService.setUserNotificationAsRead(notificationId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
