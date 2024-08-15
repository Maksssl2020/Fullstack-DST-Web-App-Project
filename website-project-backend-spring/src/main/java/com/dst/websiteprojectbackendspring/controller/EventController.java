package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.model.event.Event;
import com.dst.websiteprojectbackendspring.model.event.EventRequest;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.service.event.EventServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventController {

    private final EventServiceImpl eventService;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getEvents());
    }

    @GetMapping("/{eventId}")
    public ResponseEntity<Event> getEventById(@PathVariable Long eventId) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(eventService.getEvent(eventId));
    }

    @GetMapping("/{eventId}/count-volunteers")
    public ResponseEntity<Long> countVolunteersByEventId(@PathVariable Long eventId) {
        return ResponseEntity.ok(eventService.countRegisteredVolunteers(eventId));
    }

    @GetMapping("/{eventId}/count-basic-users")
    public ResponseEntity<Long> countBasicUsersByEventId(@PathVariable Long eventId) {
        return ResponseEntity.ok(eventService.countOtherRegisteredUsers(eventId));
    }

    @GetMapping("/{eventId}/users")
    public ResponseEntity<List<User>> getUsersByEventId(@PathVariable Long eventId) {
        return ResponseEntity.ok(eventService.getEventUsers(eventId));
    }

    @GetMapping("/{eventId}/user-registered-to-the-event/{userId}")
    public ResponseEntity<Boolean> getUserRegisteredToTheEvent(@PathVariable Long eventId, @PathVariable Long userId) {
        return ResponseEntity.ok(eventService.isUserTakingAPertInTheEvent(eventId, userId));
    }

    @GetMapping("/user-events/{userId}")
    ResponseEntity<List<Event>> getUserEventsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(eventService.getAllByUserId(userId));
    }

    @PostMapping("/add-event")
    public ResponseEntity<HttpStatus> addEvent(@RequestBody EventRequest eventRequest) {
        eventService.saveEvent(eventRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{eventId}/add-user/{userId}")
    public ResponseEntity<HttpStatus> addUserToEvent(
            @PathVariable Long eventId,
            @PathVariable("userId") Long userId
    ) throws ChangeSetPersister.NotFoundException {
        eventService.addUserToTheEvent(eventId, userId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
