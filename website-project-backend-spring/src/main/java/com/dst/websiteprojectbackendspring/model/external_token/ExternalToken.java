package com.dst.websiteprojectbackendspring.model.external_token;

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
@Table(name = "external_tokens")
public class ExternalToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "BYTEA")
    private String token;

    @Enumerated(EnumType.STRING)
    private ExternalTokenType tokenType;

    private LocalDateTime issuedAt;

    private LocalDateTime expiresIn;
}
