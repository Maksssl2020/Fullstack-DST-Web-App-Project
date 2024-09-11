package com.dst.websiteprojectbackendspring.service.article;

import com.dst.websiteprojectbackendspring.model.article.Article;
import com.dst.websiteprojectbackendspring.model.article.ArticleRequest;
import com.dst.websiteprojectbackendspring.model.article_image.ArticleImage;
import com.dst.websiteprojectbackendspring.model.news_post.NewsPost;
import com.dst.websiteprojectbackendspring.repository.ArticleRepository;
import com.dst.websiteprojectbackendspring.service.home_post.HomePostServiceImpl;
import com.dst.websiteprojectbackendspring.service.news_post.NewsPostServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final NewsPostServiceImpl newsPostService;
    private final HomePostServiceImpl homePostService;

    @Override
    public void save(ArticleRequest articleRequest) {
        Article article = setArticle(articleRequest);
        Article savedArticle = articleRepository.save(article);
        String truncatedText = articleRequest.content().substring(0, 150).concat("...");

        newsPostService.save(NewsPost
                .builder()
                .author(articleRequest.author())
                .content(truncatedText)
                .creationDate(article.getCreationDate())
                .mainArticleId(savedArticle.getId())
                .build());

        if (articleRequest.images() != null) {
            homePostService.save(truncatedText, articleRequest.author(), article.getCreationDate().toString(), articleRequest.images()[0], article.getId());
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
    public void update(Long id, ArticleRequest articleRequest) {
        Article article = setArticle(articleRequest);
        article.setId(id);
        articleRepository.save(article);
    }

    private Article setArticle(ArticleRequest articleRequest) {
        Article article = new Article();
        article.setTitle(articleRequest.title());
        article.setContent(articleRequest.content());
        article.setAuthor(articleRequest.author());
        article.setCreationDate(LocalDate.now());
        article.setImages(createArticleImages(article, articleRequest.images()));

        return article;
    }

    private List<ArticleImage> createArticleImages(Article article, MultipartFile[] images) {
       return Arrays.stream(images)
               .map(image -> {
                   try {
                       ArticleImage articleImage = new ArticleImage();
                       articleImage.setArticle(article);
                       articleImage.setImageData(image.getBytes());

                       return articleImage;
                   } catch (IOException e) {
                       throw new RuntimeException(e);
                   }
               })
               .toList();
    }
}
