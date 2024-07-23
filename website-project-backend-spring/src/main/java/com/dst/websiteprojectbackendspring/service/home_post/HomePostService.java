package com.dst.websiteprojectbackendspring.service.home_post;

import com.dst.websiteprojectbackendspring.domain.home_post.HomePost;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface HomePostService {

    void save(String content, String author, String creationDate, MultipartFile image);
    List<HomePost> findAll();
    HomePost findById(Long id) throws ChangeSetPersister.NotFoundException;
    void update(Long id, String content, String author, String creationDate, MultipartFile image);
    void delete(Long id);
}
