package com.dst.websiteprojectbackendspring.service.user;

import com.dst.websiteprojectbackendspring.domain.user.User;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User getUserByUsername(String username) throws ChangeSetPersister.NotFoundException {
        return userRepository.findByUsername(username).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public void updateUser(Long id, String username, String email, String phoneNumber, MultipartFile avatar, MultipartFile identifyPhoto) throws ChangeSetPersister.NotFoundException {
        User existingUser = userRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);

        if (username != null && !username.isEmpty()) {
            existingUser.setUsername(username);
        }
        if (email != null && !email.isEmpty()) {
            existingUser.setEmail(email);
        }
        if (phoneNumber != null && !phoneNumber.isEmpty()) {
            existingUser.setPhoneNumber(phoneNumber);
        }
        if (avatar != null && !avatar.isEmpty()) {
            try {
                existingUser.setAvatar(avatar.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload avatar", e);
            }
        }
        if (identifyPhoto != null && !identifyPhoto.isEmpty()) {
            try {
                existingUser.setIdentifyPhoto(identifyPhoto.getBytes());
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload identify photo", e);
            }
        }

        userRepository.save(existingUser);
    }
}
