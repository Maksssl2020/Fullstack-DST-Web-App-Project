package com.dst.websiteprojectbackendspring.model.warn;

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
@Table(name = "warns")
public class Warn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;
    private String message;
    private LocalDateTime createdAt;
    private boolean isRead;

    @ManyToOne
    private User user;
}
