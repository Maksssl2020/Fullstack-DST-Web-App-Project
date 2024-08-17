package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.user.UserDTO;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.service.user.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceImpl userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/{userId}/avatar")
    public ResponseEntity<String> getUserAvatar(@PathVariable Long userId) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(userService.getUserAvatarByUsername(userId));
    }

    @GetMapping("/{username}/id")
    public ResponseEntity<Long> getUserIdByUsername(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserIdByUsername(username));
    }

    @PutMapping("/{id}/update-files")
    public ResponseEntity<HttpStatus> updateUserFile(
            @PathVariable Long id,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar,
            @RequestParam(value = "identifyPhoto", required = false) MultipartFile identifyPhoto
    ) throws ChangeSetPersister.NotFoundException {
        userService.updateUserFiles(id, avatar, identifyPhoto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{id}/update")
    public ResponseEntity<HttpStatus> updateUserData(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates

            ) throws ChangeSetPersister.NotFoundException {

        userService.updateUser(id, updates);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
