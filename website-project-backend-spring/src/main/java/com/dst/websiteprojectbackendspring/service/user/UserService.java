package com.dst.websiteprojectbackendspring.service.user;

import com.dst.websiteprojectbackendspring.dto.user.UserDTO;
import com.dst.websiteprojectbackendspring.model.user.User;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public interface UserService {

    List<UserDTO> findAllUsersWithoutAdmins();
    List<UserDTO> findAllVolunteers();
    User getUserById(Long userId) throws ChangeSetPersister.NotFoundException;
    void updateUserFiles(Long userId, MultipartFile avatar, MultipartFile identifyPhoto) throws ChangeSetPersister.NotFoundException;
    void updateUser(Long id, Map<String, Object> updates) throws ChangeSetPersister.NotFoundException;
    String getUserAvatarByUsername(Long userId) throws ChangeSetPersister.NotFoundException;
    List<User> getAllUsersByEventId(Long eventId);
    Long getUserIdByUsername(String username) throws ChangeSetPersister.NotFoundException;
}
