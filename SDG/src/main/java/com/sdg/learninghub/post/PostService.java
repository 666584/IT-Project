package com.sdg.learninghub.post;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> listAll() {
        return postRepository.findAll();
    }

    /** save the new created post*/
    public void save(Post post) {
        post.setLikeCount(0);
        post.setViewCount(0);
        post.setLastUpdate(new Date());
        postRepository.save(post);
    }

    /** Count the views of the post*/
    public Post getPostByID(Long postId){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()){
            Post post = optionalPost.get();
            post.setViewCount(post.getViewCount() + 1);
            return postRepository.save(post);
        } else{
            throw new EntityNotFoundException("Post not found");
        }
    }

    /** Count the likes of the post*/
    public void likePost(Long postId){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()){
            Post post = optionalPost.get();
            post.setLikeCount(post.getLikeCount() + 1);
            postRepository.save(post);
        } else {
            throw new EntityNotFoundException("Post not found with id: " + postId);
        }
    }

    public void delete(Long id) {
        postRepository.deleteById(id);
    }
}
