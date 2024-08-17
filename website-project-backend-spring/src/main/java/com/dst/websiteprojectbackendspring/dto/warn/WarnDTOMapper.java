package com.dst.websiteprojectbackendspring.dto.warn;

import com.dst.websiteprojectbackendspring.model.warn.Warn;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class WarnDTOMapper implements Function<Warn, WarnDTO> {
    @Override
    public WarnDTO apply(Warn warn) {
        return new WarnDTO(warn.getId(), warn.getAuthor(), warn.getMessage(), warn.getCreatedAt(), warn.isRead(), warn.getUser().getId());
    }
}
