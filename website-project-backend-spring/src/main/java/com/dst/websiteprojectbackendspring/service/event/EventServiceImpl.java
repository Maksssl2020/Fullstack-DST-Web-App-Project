package com.dst.websiteprojectbackendspring.service.event;

import com.dst.websiteprojectbackendspring.model.event.Event;
import com.dst.websiteprojectbackendspring.model.event.EventRequest;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.model.user.UserRole;
import com.dst.websiteprojectbackendspring.repository.EventRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Override
    public void saveEvent(EventRequest eventRequest) {
        Event event = new Event();
        event.setTitle(eventRequest.title());
        event.setDescription(eventRequest.description());
        event.setEventDate(eventRequest.eventDate());
        event.setRegistrationEndDate(eventRequest.registrationEndDate());
        event.setTasks(eventRequest.tasks());
        event.setEventNumber(eventRepository.count() + 1);
        eventRepository.save(event);
    }

    @Override
    public void addUserToTheEvent(Long eventId, Long userId) throws ChangeSetPersister.NotFoundException {
        Event foundEvent = eventRepository.findById(eventId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        User foundUser = userRepository.findById(userId).orElseThrow(ChangeSetPersister.NotFoundException::new);

        foundUser.getEvents().add(foundEvent);
        foundEvent.getUsers().add(foundUser);

        eventRepository.save(foundEvent);
        userRepository.save(foundUser);
    }

    @Override
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @Override
    public List<User> getEventUsers(Long eventId) {
        return userRepository.findAllUsersByEventId(eventId);
    }

    @Override
    public Event getEvent(Long id) throws ChangeSetPersister.NotFoundException {
        return eventRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public Long countRegisteredVolunteers(Long eventId) {
        return eventRepository.countByIdAndUserRole(eventId, UserRole.VOLUNTEER);
    }

    @Override
    public Long countOtherRegisteredUsers(Long eventId) {
        Long allEventUsers = eventRepository.countByIdAndUserRole(eventId, UserRole.REGISTERED);
        Long allEventVolunteers = eventRepository.countByIdAndUserRole(eventId, UserRole.VOLUNTEER);

        return allEventUsers - allEventVolunteers;
    }

    @Override
    public boolean isUserTakingAPertInTheEvent(Long eventId, Long userId) {
        return eventRepository.existsByEventIdAndUserId(eventId, userId) > 0;
    }

    @Override
    public List<Event> getAllByUserId(Long userId) {
        return eventRepository.findAllByUserId(userId);
    }
}
