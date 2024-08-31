package com.dst.websiteprojectbackendspring.repository;

import com.dst.websiteprojectbackendspring.model.message.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    Message findByUserId(Long userId);
    List<Message> findAllByUserId(Long userId);
}
