package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u JOIN u.events e WHERE e.id = :eventId")
    List<User> findAllUsersByEventId(@Param("eventId") Long eventId);

    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}
