package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.domain.user.User;
import com.dst.websiteprojectbackendspring.service.user.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("/{username}")
    public ResponseEntity<User> getUser(@PathVariable String username) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(userService.getUserByUsername(username));
    }

    @GetMapping("/{username}/avatar")
    public ResponseEntity<String> getUserAvatar(@PathVariable String username) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(userService.getUserAvatarByUsername(username));
    }

    @PutMapping("/{id}")
    public ResponseEntity<HttpStatus> updateUser(
            @PathVariable Long id,
            @RequestParam(value = "username", required = false) String username,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar,
            @RequestParam(value = "identifyImage", required = false) MultipartFile identifyPhoto

            ) throws ChangeSetPersister.NotFoundException {

        userService.updateUser(id, username, email, phoneNumber, avatar, identifyPhoto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
