package com.dst.websiteprojectbackendspring.service.comment;

import com.dst.websiteprojectbackendspring.domain.comment.Comment;
import com.dst.websiteprojectbackendspring.domain.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.repository.CommentRepository;
import com.dst.websiteprojectbackendspring.repository.ForumPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ForumPostRepository forumPostRepository;

    @Override
    public void saveComment(Comment comment, Long postId) throws ChangeSetPersister.NotFoundException {
        ForumPost forumPost = forumPostRepository.findById(postId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        comment.setForumPost(forumPost);
        commentRepository.save(comment);
    }

    @Override
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByForumPostId(postId);
    }

    @Override
    public Long countCommentsByPostId(Long postId) {
        return commentRepository.countByForumPostId(postId);
    }

    @Override
    public void updateComment(Long postId, Long commentId, Comment comment) throws ChangeSetPersister.NotFoundException {
        if (commentRepository.existsById(commentId)) {
            comment.setId(commentId);
            ForumPost forumPost = forumPostRepository.findById(postId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            comment.setForumPost(forumPost);
            commentRepository.save(comment);
        }
    }

    @Override
    public void deleteComment(Long postId, Long commentId) throws ChangeSetPersister.NotFoundException {
        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
        }
    }
}
