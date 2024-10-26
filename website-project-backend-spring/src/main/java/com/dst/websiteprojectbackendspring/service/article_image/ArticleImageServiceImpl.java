package com.dst.websiteprojectbackendspring.service.article_image;

import com.dst.websiteprojectbackendspring.dto.article_image.ArticleImageDTO;
import com.dst.websiteprojectbackendspring.mapper.ArticleImageDTOMapper;
import com.dst.websiteprojectbackendspring.model.article.Article;
import com.dst.websiteprojectbackendspring.model.article_image.ArticleImage;
import com.dst.websiteprojectbackendspring.repository.ArticleImageRepository;
import com.dst.websiteprojectbackendspring.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleImageServiceImpl implements ArticleImageService {

    private final ArticleImageRepository articleImageRepository;
    private final ArticleRepository articleRepository;
    private final ArticleImageDTOMapper articleImageDTOMapper;

    @Override
    public void save(Long articleId, ArticleImage articleImage) {
        try {
            Article foundArticle = articleRepository.findById(articleId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            articleImage.setArticle(foundArticle);
            articleImageRepository.save(articleImage);
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<ArticleImageDTO> findAllByArticleId(Long articleId) {
        return articleImageRepository.findByArticleId(articleId).stream()
                .map(articleImageDTOMapper::mapArticleImageIntoArticleImageDTO)
                .toList();
    }
}
