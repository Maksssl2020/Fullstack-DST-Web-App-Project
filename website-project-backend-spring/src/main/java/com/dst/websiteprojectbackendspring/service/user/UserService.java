package com.dst.websiteprojectbackendspring.service.user;

import com.dst.websiteprojectbackendspring.model.user.User;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface UserService {

    User getUserByUsername(String username) throws ChangeSetPersister.NotFoundException;
    void updateUser(Long id, String username, String email, String phoneNumber, MultipartFile avatar, MultipartFile identifyPhoto) throws ChangeSetPersister.NotFoundException;
    String getUserAvatarByUsername(String username) throws ChangeSetPersister.NotFoundException;
    List<User> getAllUsersByEventId(Long eventId);
}