package com.dst.websiteprojectbackendspring.service.home_post;

import com.dst.websiteprojectbackendspring.dto.home_post.HomePostRequest;
import com.dst.websiteprojectbackendspring.model.home_post.HomePost;
import com.dst.websiteprojectbackendspring.repository.HomePostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HomePostServiceImpl implements HomePostService {

    private final HomePostRepository homePostRepository;

    @Override
    public void save(String content, String author, String creationDate, MultipartFile image) {
        HomePost homePost = setHomePost(content, author, creationDate, image);
        homePostRepository.save(homePost);
    }

    @Override
    public void save(String content, String author, String creationDate, MultipartFile image, Long mainArticleId) {
        HomePost homePost = setHomePost(content, author, creationDate, image);
        homePost.setMainArticleId(mainArticleId);
        homePostRepository.save(homePost);
    }

    @Override
    public List<HomePost> findAll() {
        return homePostRepository.findAll().stream().limit(6).toList();
    }

    @Override
    public HomePost findById(Long id) throws ChangeSetPersister.NotFoundException {
        return homePostRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public void update(Long id, HomePostRequest homePostRequest) {
        try {
            HomePost foundHomePost = homePostRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
            foundHomePost.setContent(homePostRequest.content());
            foundHomePost.setImage(homePostRequest.image().getBytes());
            homePostRepository.save(foundHomePost);
        } catch (ChangeSetPersister.NotFoundException | IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void delete(Long id) {
        homePostRepository.deleteById(id);
    }

    private HomePost setHomePost(String content, String author, String creationDate, MultipartFile image) {
        HomePost homePost = new HomePost();
        homePost.setContent(content);
        homePost.setAuthor(author);
        homePost.setCreationDate(LocalDate.parse(creationDate));
        try {
            homePost.setImage(image.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return homePost;
    }
}
