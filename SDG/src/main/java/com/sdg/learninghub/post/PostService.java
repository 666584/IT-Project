package com.sdg.learninghub.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> listAll() {
        return postRepository.findAll();
    }

    public void save(Post post) {
        post.setLikeCount(0);
        post.setViewCount(0);
        post.setLastUpdate(new Date());
        postRepository.save(post);
    }

    public void delete(int id) {
        postRepository.deleteById(id);
    }
}
