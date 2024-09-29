package com.dst.websiteprojectbackendspring.service.comment;

import com.dst.websiteprojectbackendspring.dto.comment.CommentDTO;
import com.dst.websiteprojectbackendspring.dto.comment.CommentDTOMapper;
import com.dst.websiteprojectbackendspring.dto.comment.CommentRequest;
import com.dst.websiteprojectbackendspring.dto.comment.CommentUpdateRequest;
import com.dst.websiteprojectbackendspring.model.comment.Comment;
import com.dst.websiteprojectbackendspring.model.forum_post.ForumPost;
import com.dst.websiteprojectbackendspring.model.user.User;
import com.dst.websiteprojectbackendspring.repository.CommentRepository;
import com.dst.websiteprojectbackendspring.repository.ForumPostRepository;
import com.dst.websiteprojectbackendspring.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ForumPostRepository forumPostRepository;
    private final UserRepository userRepository;
    private final CommentDTOMapper commentDTOMapper;

    @Override
    public void saveComment(CommentRequest commentRequest, Long postId) throws ChangeSetPersister.NotFoundException {
        Comment comment = setComment(commentRequest, postId);
        commentRepository.save(comment);
    }

    @Override
    public List<CommentDTO> getCommentsByPostId(Long postId) {
        return commentRepository.findByForumPostId(postId).stream()
                .map(commentDTOMapper)
                .sorted(Comparator.comparing(CommentDTO::postId).reversed())
                .toList();
    }

    @Override
    public Long countCommentsByPostId(Long postId) {
        return commentRepository.countByForumPostId(postId);
    }

    @Override
    public void updateComment(Long postId, Long commentId, CommentUpdateRequest commentUpdateRequest) throws ChangeSetPersister.NotFoundException {
        Comment foundComment = commentRepository.findById(commentId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        foundComment.setId(commentId);
        foundComment.setContent(commentUpdateRequest.commentContent());
        commentRepository.save(foundComment);
    }

    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    private Comment setComment(CommentRequest commentRequest, Long postId) {
        try {
            ForumPost forumPost  = forumPostRepository.findById(postId).orElseThrow(ChangeSetPersister.NotFoundException::new);
            User foundUser = userRepository.findById(commentRequest.authorId()).orElseThrow(ChangeSetPersister.NotFoundException::new);
            Comment comment = new Comment();
            comment.setContent(commentRequest.content());
            comment.setCreationDate(LocalDateTime.now());
            comment.setForumPost(forumPost);
            comment.setUser(foundUser);

            return comment;
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
