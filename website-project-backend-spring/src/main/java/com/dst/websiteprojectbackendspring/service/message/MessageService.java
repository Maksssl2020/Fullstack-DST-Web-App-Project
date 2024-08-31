package com.dst.websiteprojectbackendspring.service.message;

import com.dst.websiteprojectbackendspring.dto.message.MessageDTO;
import com.dst.websiteprojectbackendspring.model.message.MessageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MessageService {

    void saveMessage(Long userId, MessageRequest messageRequest);
    List<MessageDTO> findAllNonReadUserMessages(Long userId);
    List<MessageDTO> findAllUserMessages(Long userId);
    void markMessageAsRead(Long messageId);
}
