package com.dst.websiteprojectbackendspring.service.user;

import com.dst.websiteprojectbackendspring.dto.user.UserDTO;
import com.dst.websiteprojectbackendspring.dto.user.UserDisplayDataDTO;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public interface UserService {

    boolean isUsernameUnique(String username);
    boolean isEmailUnique(String email);
    List<UserDTO> findAllUsersWithoutAdmins();
    List<UserDTO> findAllVolunteers();
    UserDTO getUserById(Long userId) throws ChangeSetPersister.NotFoundException;
    void updateUserFiles(Long userId, MultipartFile avatar, MultipartFile identifyPhoto) throws ChangeSetPersister.NotFoundException;
    void updateUser(Long id, Map<String, Object> updates) throws ChangeSetPersister.NotFoundException;
    UserDisplayDataDTO getUserDisplayData(Long userId) throws ChangeSetPersister.NotFoundException;
    Long getUserIdByUsername(String username) throws ChangeSetPersister.NotFoundException;
}
