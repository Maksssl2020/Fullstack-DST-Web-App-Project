package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.message.MessageDTO;
import com.dst.websiteprojectbackendspring.model.message.MessageRequest;
import com.dst.websiteprojectbackendspring.service.message.MessageServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageServiceImpl messageService;

    @GetMapping("/{userId}/get-non-reads")
    public ResponseEntity<List<MessageDTO>> findALlUserNonReadMessages(@PathVariable Long userId) {
        return ResponseEntity.ok(messageService.findAllNonReadUserMessages(userId));
    }

    @GetMapping("/{userId}/get-all")
    public ResponseEntity<List<MessageDTO>> findALlUserMessages(@PathVariable Long userId) {
        return ResponseEntity.ok(messageService.findAllUserMessages(userId));
    }

    @PostMapping("/{userId}/send-message")
    public ResponseEntity<HttpStatus> saveMessage(@PathVariable Long userId, @RequestBody MessageRequest messageRequest) {
        messageService.saveMessage(userId, messageRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{messageId}/is-read")
    public ResponseEntity<HttpStatus> isMessageRead(@PathVariable Long messageId) {
        messageService.markMessageAsRead(messageId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
