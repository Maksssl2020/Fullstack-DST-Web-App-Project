package com.dst.websiteprojectbackendspring.service.article;

import com.dst.websiteprojectbackendspring.domain.article.Article;
import com.dst.websiteprojectbackendspring.domain.news_post.NewsPost;
import com.dst.websiteprojectbackendspring.repository.ArticleRepository;
import com.dst.websiteprojectbackendspring.service.home_post.HomePostServiceImpl;
import com.dst.websiteprojectbackendspring.service.news_post.NewsPostServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final NewsPostServiceImpl newsPostService;
    private final HomePostServiceImpl homePostService;

    @Override
    public void save(String title, String content, String author, LocalDate creationDate, MultipartFile image) {
        Article article = setArticle(title, content, author, creationDate, image);
        Article savedArticle = articleRepository.save(article);

        String truncatedText = content.substring(0, 150).concat("...");
        newsPostService.save(NewsPost
                .builder()
                .author(author)
                .content(truncatedText)
                .creationDate(creationDate)
                .mainArticleId(savedArticle.getId())
                .build());

        if (image != null) {
            homePostService.save(truncatedText, author, creationDate.toString(), image, article.getId());
        }
    }

    @Override
    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    @Override
    public Article findById(Long id) throws ChangeSetPersister.NotFoundException {
        return articleRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    public void delete(Long id) {
        articleRepository.deleteById(id);
    }

    @Override
    public void update(Long id, String title, String content, String author, LocalDate creationDate, MultipartFile image) {
        Article article = setArticle(title, content, author, creationDate, image);
        article.setId(id);
        articleRepository.save(article);
    }

    private Article setArticle(String title, String content, String author, LocalDate creationDate, MultipartFile image) {
        Article article = new Article();
        article.setTitle(title);
        article.setContent(content);
        article.setAuthor(author);
        article.setCreationDate(creationDate);

        if (image != null) {
            try {
                article.setImage(image.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return article;
    }
}
