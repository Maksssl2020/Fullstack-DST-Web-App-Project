package com.dst.websiteprojectbackendspring.service.article;

import com.dst.websiteprojectbackendspring.mapper.ArticleDTOMapper;
import com.dst.websiteprojectbackendspring.dto.article.ArticleManagementDTO;
import com.dst.websiteprojectbackendspring.dto.article.ArticleRequest;
import com.dst.websiteprojectbackendspring.model.article.Article;
import com.dst.websiteprojectbackendspring.model.article_image.ArticleImage;
import com.dst.websiteprojectbackendspring.model.news_post.NewsPost;
import com.dst.websiteprojectbackendspring.model.social_media_link.SocialMediaLink;
import com.dst.websiteprojectbackendspring.repository.ArticleRepository;
import com.dst.websiteprojectbackendspring.service.home_post.HomePostServiceImpl;
import com.dst.websiteprojectbackendspring.service.news_post.NewsPostServiceImpl;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final NewsPostServiceImpl newsPostService;
    private final HomePostServiceImpl homePostService;
    private final ArticleDTOMapper articleDTOMapper;

    @Override
    @Transactional
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
    public List<ArticleManagementDTO> findAll() {
        return articleRepository.findAll().stream()
                .map(articleDTOMapper::mapArticleToArticleManagementDTO)
                .sorted(Comparator.comparing(ArticleManagementDTO::getId).reversed())
                .toList();
    }

    @Override
    public Article findById(Long id) throws ChangeSetPersister.NotFoundException {
        return articleRepository.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        homePostService.deleteByMainArticleId(id);
        newsPostService.deleteByMainArticleId(id);
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

        if (articleRequest.socialMediaLinksJson() != null) {
            article.setSocialMediaLinks(createSocialMediaLinks(article, articleRequest.socialMediaLinksJson()));
        }

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

    private List<SocialMediaLink> createSocialMediaLinks(Article article, String socialMediaLinksJson) {

        return createMapFromJson(socialMediaLinksJson).entrySet().stream()
                .map(entry -> {
                    SocialMediaLink socialMediaLink = new SocialMediaLink();
                    socialMediaLink.setSocialMediaName(entry.getKey());
                    socialMediaLink.setUrl(entry.getValue());
                    socialMediaLink.setArticle(article);

                    return socialMediaLink;
                })
                .toList();
    }

    private Map<String, String> createMapFromJson(String json) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.readValue(json, new TypeReference<>() {
            });
        } catch (JsonProcessingException jsonProcessingException) {
            throw new RuntimeException(jsonProcessingException);
        }
    }
}
