package com.dst.websiteprojectbackendspring.model.request_to_admin;

import com.dst.websiteprojectbackendspring.model.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "requests_to_admin")
public class RequestToAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RequestToAdminType requestToAdminType;

    private String userEnteredValueToChange;

    private boolean isAccepted;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
