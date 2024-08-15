package com.dst.websiteprojectbackendspring.service.event;

import com.dst.websiteprojectbackendspring.model.event.Event;
import com.dst.websiteprojectbackendspring.model.event.EventRequest;
import com.dst.websiteprojectbackendspring.model.user.User;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EventService {

    void saveEvent(EventRequest eventRequest);
    void addUserToTheEvent(Long eventId, Long userId) throws ChangeSetPersister.NotFoundException;
    List<Event> getEvents();
    List<User> getEventUsers(Long eventId);
    Event getEvent(Long id) throws ChangeSetPersister.NotFoundException;
    Long countRegisteredVolunteers(Long eventId);
    Long countOtherRegisteredUsers(Long eventId);
    boolean isUserTakingAPertInTheEvent(Long eventId, Long userId) throws ChangeSetPersister.NotFoundException;
    List<Event> getAllByUserId(Long userId);
}
