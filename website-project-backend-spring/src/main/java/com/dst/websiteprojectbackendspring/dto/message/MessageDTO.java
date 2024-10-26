package com.dst.websiteprojectbackendspring.dto.message;

import com.dst.websiteprojectbackendspring.dto.request_to_admin.RequestToAdminDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MessageDTO {
    private Long messageId;
    private String author;
    private String message;
    private String messageType;
    private LocalDateTime createdAt;
    private boolean isRead;
    private Long userId;
    private RequestToAdminDTO requestToAdminDTO;
}
