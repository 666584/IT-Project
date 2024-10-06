package com.sdg.learninghub.post;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> listAll() {
        return postRepository.findAll();
    }

    public void save(Post post) {
        postRepository.save(post);
    }

    public Post get(int id) {
        return postRepository.findById(id).get();
    }

    public void delete(int id) {
        postRepository.deleteById(id);
    }
}
