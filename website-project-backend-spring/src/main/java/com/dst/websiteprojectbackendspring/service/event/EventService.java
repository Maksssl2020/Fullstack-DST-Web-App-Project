package com.dst.websiteprojectbackendspring.service.event;

import com.dst.websiteprojectbackendspring.dto.event.EventDTO;
import com.dst.websiteprojectbackendspring.dto.user.UserDTO;
import com.dst.websiteprojectbackendspring.model.event.EventRequest;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EventService {

    void saveEvent(EventRequest eventRequest);
    void addUserToTheEvent(Long eventId, Long userId) throws ChangeSetPersister.NotFoundException;
    List<EventDTO> getEvents();
    List<EventDTO> getAllByUserId(Long userId);
    List<UserDTO> getEventUsers(Long eventId);
    EventDTO getEvent(Long id) throws ChangeSetPersister.NotFoundException;
    Long countRegisteredVolunteers(Long eventId);
    Long countOtherRegisteredUsers(Long eventId);
    boolean isUserTakingAPertInTheEvent(Long eventId, Long userId) throws ChangeSetPersister.NotFoundException;
}
