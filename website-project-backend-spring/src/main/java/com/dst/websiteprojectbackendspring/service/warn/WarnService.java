package com.dst.websiteprojectbackendspring.service.warn;

import com.dst.websiteprojectbackendspring.dto.warn.WarnDTO;
import com.dst.websiteprojectbackendspring.model.warn.WarnRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WarnService {

    void saveWarn(Long userId, WarnRequest warnRequest);
    List<WarnDTO> findAllNonReadUserWarns(Long userId);
    List<WarnDTO> findAllUserWarns(Long userId);
}
