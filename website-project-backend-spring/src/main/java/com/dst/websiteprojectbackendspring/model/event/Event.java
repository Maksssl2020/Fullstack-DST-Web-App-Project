package com.dst.websiteprojectbackendspring.model.event;

import com.dst.websiteprojectbackendspring.model.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDateTime eventDate;
    private LocalDateTime registrationEndDate;

    @ElementCollection
    @CollectionTable(name = "event_tasks", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "task")
    private List<String> tasks;

    @ManyToMany(mappedBy = "events")
    @JsonBackReference
    private List<User> users;
}
