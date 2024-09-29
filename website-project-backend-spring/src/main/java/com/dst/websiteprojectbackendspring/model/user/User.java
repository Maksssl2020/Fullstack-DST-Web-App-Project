package com.dst.websiteprojectbackendspring.model.user;

import com.dst.websiteprojectbackendspring.model.comment.Comment;
import com.dst.websiteprojectbackendspring.model.event.Event;
import com.dst.websiteprojectbackendspring.model.forum_post.ForumPost;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.NumberDeserializers;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "website_users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "Username cannot be blank!")
    @NotEmpty(message = "Username cannot be empty!")
    private String username;

    @Column(unique = true, nullable = false)
    @NotBlank(message = "E-mail cannot be blank!")
    @NotEmpty(message = "E-mail cannot be empty!")
    @Email(message = "Invalid e-mail!")
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Pattern(regexp = "^([1-9][0-9]{8})?$", message = "Invalid phone number!")
    private String phoneNumber;

    private boolean accountEnabled;
    private boolean accountLocked;

    private LocalDate accountCreationDate;

    @Past
    @Column
    @JsonFormat(pattern = "dd.MM.yyyy")
    private LocalDate dateOfBirth;

    @Lob
    @JsonDeserialize(using = NumberDeserializers.ByteDeserializer.class)
    private byte[] avatar;

    @Lob
    @JsonDeserialize(using = NumberDeserializers.ByteDeserializer.class)
    private byte[] identifyPhoto;

    @ManyToMany
    @JoinTable(
            name = "user_events",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "event_id")
    )
    @JsonManagedReference
    private List<Event> events = new ArrayList<>();

    @OneToMany(mappedBy = "author")
    @JsonManagedReference
    private List<ForumPost> forumPosts;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private List<Comment> comments;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return accountEnabled;
    }
}
