package com.dst.websiteprojectbackendspring.service.user;

import com.dst.websiteprojectbackendspring.dto.user.UserDTO;
import com.dst.websiteprojectbackendspring.dto.user.UserDTOMapper;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.model.user.UserRole;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

    @Override
    public List<UserDTO> findAllUsersWithoutAdmins() {
        return userRepository.findAll().stream()
                .map(userDTOMapper)
                .filter(user -> user.role() != UserRole.ADMIN)
                .sorted(Comparator.comparing(UserDTO::id).reversed())
                .toList();
    }

    @Override
    public List<UserDTO> findAllVolunteers() {
        return userRepository.findAll().stream()
                .map(userDTOMapper)
                .filter(user -> user.role().equals(UserRole.VOLUNTEER))
                .sorted(Comparator.comparing(UserDTO::id).reversed())
                .toList();
    }

    @Override
    public User getUserById(Long userId) throws ChangeSetPersister.NotFoundException {
        return userRepository.findById(userId).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public void updateUserFiles(Long userId, MultipartFile avatar, MultipartFile identifyPhoto) throws ChangeSetPersister.NotFoundException {
        User foundUser = userRepository.findById(userId).orElseThrow(ChangeSetPersister.NotFoundException::new);

        try {
            if (avatar != null && !avatar.isEmpty() ) {
                foundUser.setAvatar(avatar.getBytes());
            }
            if (identifyPhoto != null && !identifyPhoto.isEmpty() ) {
                foundUser.setIdentifyPhoto(identifyPhoto.getBytes());
            }
            foundUser.setId(userId);

            userRepository.save(foundUser);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void updateUser(Long id, Map<String, Object> updates) throws ChangeSetPersister.NotFoundException {
        User existingUser = userRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);

        updates.forEach((key, value) -> {
            if (key.equals("role") && value != null) {
                existingUser.setRole(UserRole.valueOf(value.toString()));
            } else {
                Field field = ReflectionUtils.findField(User.class, key);
                if (field != null) {
                    field.setAccessible(true);
                    ReflectionUtils.setField(field, existingUser, value);
                }
            }
        });

        userRepository.save(existingUser);
    }

    @Override
    public String getUserAvatarByUsername(Long userId) throws ChangeSetPersister.NotFoundException {
        User foundUser = userRepository.findById(userId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        if (foundUser.getAvatar() != null) {
            byte[] userAvatar = foundUser.getAvatar();
            return Base64.getEncoder().encodeToString(userAvatar);
        } else {
            return null;
        }
    }

    @Override
    public List<User> getAllUsersByEventId(Long eventId) {
        return userRepository.findAllUsersByEventId(eventId);
    }

    @Override
    public Long getUserIdByUsername(String username) {
        try {
            return userRepository.findByUsername(username).orElseThrow(ChangeSetPersister.NotFoundException::new).getId();
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
