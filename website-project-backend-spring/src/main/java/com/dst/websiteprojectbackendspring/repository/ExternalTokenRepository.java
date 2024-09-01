package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.external_token.ExternalToken;
import com.dst.websiteprojectbackendspring.model.external_token.ExternalTokenType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExternalTokenRepository extends JpaRepository<ExternalToken, Integer> {

    ExternalToken findByTokenType(ExternalTokenType tokenType);
}
