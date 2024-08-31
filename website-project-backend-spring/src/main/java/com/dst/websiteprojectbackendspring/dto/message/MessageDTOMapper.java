package com.dst.websiteprojectbackendspring.dto.message;

import com.dst.websiteprojectbackendspring.dto.request_to_admin.RequestToAdminDTO;
import com.dst.websiteprojectbackendspring.model.message.Message;
import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdmin;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class MessageDTOMapper implements Function<Message, MessageDTO> {
    @Override
    public MessageDTO apply(Message message) {
        RequestToAdminDTO requestToAdminDTO = null;

        if (message.getRequestToAdmin() != null) {
            RequestToAdmin requestToAdmin = message.getRequestToAdmin();
            requestToAdminDTO  = new RequestToAdminDTO(requestToAdmin.getId(), requestToAdmin.getRequestToAdminType().toString(), requestToAdmin.isAccepted(), requestToAdmin.getUserEnteredValueToChange(), requestToAdmin.getUser().getId());
        }

        String messageTypeStr = message.getMessageType() != null
                ? message.getMessageType().toString()
                : "INFORMATION";

        return new MessageDTO(message.getId(), message.getAuthor(), message.getMessage(), messageTypeStr, message.getCreatedAt(), message.isRead(), message.getUser().getId(), requestToAdminDTO);
    }
}
