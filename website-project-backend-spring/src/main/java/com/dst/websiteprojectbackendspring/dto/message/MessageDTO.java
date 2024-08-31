package com.dst.websiteprojectbackendspring.dto.message;

import com.dst.websiteprojectbackendspring.dto.request_to_admin.RequestToAdminDTO;
import jakarta.annotation.Nullable;

import java.time.LocalDateTime;

public record MessageDTO(Long messageId, String author, String message, @Nullable String messageType, LocalDateTime createdAt, boolean isRead, Long userId, @Nullable RequestToAdminDTO requestToAdminDTO) {
}
