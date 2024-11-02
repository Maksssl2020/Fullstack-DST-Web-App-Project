package com.dst.websiteprojectbackendspring.service.external_token;

import com.dst.websiteprojectbackendspring.repository.ExternalTokenRepository;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ExternalTokenServiceImplTest {


    @Mock
    private ExternalTokenRepository externalTokenRepository;

    @InjectMocks
    private ExternalTokenServiceImpl externalTokenService;

}