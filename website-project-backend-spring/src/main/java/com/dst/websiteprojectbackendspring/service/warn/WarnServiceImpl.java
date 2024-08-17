package com.dst.websiteprojectbackendspring.service.warn;

import com.dst.websiteprojectbackendspring.dto.warn.WarnDTO;
import com.dst.websiteprojectbackendspring.dto.warn.WarnDTOMapper;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.model.warn.Warn;
import com.dst.websiteprojectbackendspring.model.warn.WarnRequest;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import com.dst.websiteprojectbackendspring.repository.WarnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WarnServiceImpl implements WarnService {

    private final WarnRepository warnRepository;
    private final UserRepository userRepository;
    private final WarnDTOMapper warnDTOMapper;

    @Override
    public void saveWarn(Long userId, WarnRequest warnRequest) {
        Warn warn = new Warn();
        warn.setAuthor(warnRequest.author());
        warn.setMessage(warnRequest.message());
        warn.setCreatedAt(LocalDateTime.now());
        warn.setRead(false);

        try {
            User user = userRepository.findById(userId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            warn.setUser(user);
            warnRepository.save(warn);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<WarnDTO> findAllNonReadUserWarns(Long userId) {
        return warnRepository.findAllByUserId(userId).stream()
                .map(warnDTOMapper)
                .filter(warnDTO -> !warnDTO.isRead())
                .toList();
    }

    @Override
    public List<WarnDTO> findAllUserWarns(Long userId) {
        return warnRepository.findAllByUserId(userId).stream()
                .map(warnDTOMapper)
                .toList();
    }
}
