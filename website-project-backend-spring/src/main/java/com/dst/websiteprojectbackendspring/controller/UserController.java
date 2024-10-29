package com.dst.websiteprojectbackendspring.controller;

import com.dst.websiteprojectbackendspring.dto.user.UserDTO;
import com.dst.websiteprojectbackendspring.dto.user.UserDisplayDataDTO;
import com.dst.websiteprojectbackendspring.service.user.UserService;
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

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsersWithoutAdmins(@RequestParam("filterParam") String filterParam) {
        return ResponseEntity.ok(userService.findAllUsersWithoutAdmins(filterParam));
    }

    @GetMapping("/volunteers")
    public ResponseEntity<List<UserDTO>> getAllVolunteers() {
        return ResponseEntity.ok(userService.findAllVolunteers());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long userId) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/{userId}/display-data")
    public ResponseEntity<UserDisplayDataDTO> getUserDisplayData(@PathVariable Long userId) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(userService.getUserDisplayData(userId));
    }

    @GetMapping("/{username}/id")
    public ResponseEntity<Long> getUserIdByUsername(@PathVariable String username) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(userService.getUserIdByUsername(username));
    }

    @GetMapping("/is-username-unique")
    public ResponseEntity<Boolean> isUsernameUnique(@RequestParam String username) {
        return ResponseEntity.ok(userService.isUsernameUnique(username));
    }

    @GetMapping("/is-email-unique")
    public ResponseEntity<Boolean> isEmailUnique(@RequestParam String email) {
        return ResponseEntity.ok(userService.isEmailUnique(email));
    }

    @PutMapping("/{id}/update-files")
    public ResponseEntity<HttpStatus> updateUserFiles(
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
