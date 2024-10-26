package com.dst.websiteprojectbackendspring.service.message;

import com.dst.websiteprojectbackendspring.dto.message.MessageDTO;
import com.dst.websiteprojectbackendspring.mapper.MessageDTOMapper;
import com.dst.websiteprojectbackendspring.model.message.Message;
import com.dst.websiteprojectbackendspring.model.message.MessageRequest;
import com.dst.websiteprojectbackendspring.model.message.MessageType;
import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdmin;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.repository.MessageRepository;
import com.dst.websiteprojectbackendspring.repository.RequestToAdminRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final RequestToAdminRepository requestToAdminRepository;
    private final MessageDTOMapper messageDTOMapper;

    @Override
    public void saveMessage(Long userId, MessageRequest messageRequest) {
        Message message = new Message();
        message.setAuthor(messageRequest.author());
        message.setMessage(messageRequest.message());
        message.setMessageType(MessageType.valueOf(messageRequest.messageType().toUpperCase()));
        message.setCreatedAt(LocalDateTime.now());
        message.setRead(false);

        try {
            User user = userRepository.findById(userId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            message.setUser(user);

            if (messageRequest.requestId() != null) {
                RequestToAdmin foundRequest = requestToAdminRepository.findById(messageRequest.requestId()).orElseThrow(ChangeSetPersister.NotFoundException::new);
                message.setRequestToAdmin(foundRequest);
            }

            messageRepository.save(message);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<MessageDTO> findAllNonReadUserMessages(Long userId) {
        return messageRepository.findAllByUserId(userId).stream()
                .map(messageDTOMapper::mapMessageIntoMessageDTO)
                .filter(messageDTO -> !messageDTO.isRead())
                .toList();
    }

    @Override
    public List<MessageDTO> findAllUserMessages(Long userId) {
        return messageRepository.findAllByUserId(userId).stream()
                .map(messageDTOMapper::mapMessageIntoMessageDTO)
                .toList();
    }

    @Override
    public void markMessageAsRead(Long messageId) {
        try {
            Message foundMessage = messageRepository.findById(messageId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            foundMessage.setRead(true);
            messageRepository.save(foundMessage);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
