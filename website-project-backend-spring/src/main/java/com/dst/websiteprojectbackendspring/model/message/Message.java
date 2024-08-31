package com.dst.websiteprojectbackendspring.model.message;

import com.dst.websiteprojectbackendspring.model.request_to_admin.RequestToAdmin;
import com.dst.websiteprojectbackendspring.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;
    private String message;

    @Enumerated(EnumType.STRING)
    private MessageType messageType;

    private LocalDateTime createdAt;
    private boolean isRead;

    @ManyToOne
    private RequestToAdmin requestToAdmin;

    @ManyToOne
    private User user;
}
