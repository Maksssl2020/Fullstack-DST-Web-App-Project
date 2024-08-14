package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.event.Event;
import com.dst.websiteprojectbackendspring.model.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT COUNT(u) FROM Event e JOIN e.users u WHERE e.id = :eventId AND u.role = :userRole")
    Long countByIdAndUserRole(Long eventId, UserRole userRole);
}
