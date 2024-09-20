package com.dst.websiteprojectbackendspring.dto.article;

import com.dst.websiteprojectbackendspring.dto.social_media_link.SocialMediaLinkRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ArticleRequestTest {
    String title;
    String content;
    String author;
    List<SocialMediaLinkRequest> socialMediaLinks;
    List<MultipartFile> images;

    @Override
    public String toString() {
        return "ArticleRequestTest{" +
                "title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", author='" + author + '\'' +
                ", socialMediaLinks=" + socialMediaLinks +
                ", images=" + images +
                '}';
    }
}
