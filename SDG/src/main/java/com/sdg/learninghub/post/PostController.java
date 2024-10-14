package com.sdg.learninghub.post;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostService postService;

    @RequestMapping("/")
    public String viewHomePage(Model model) {
        List<Post> listPost = postService.listAll();
        model.addAttribute("listPost", listPost);
        return "index_post";
    }

    @RequestMapping("/new_post")
    public String showNewPostPage(Model model) {
        Post post = new Post();
        model.addAttribute("post", post);
        return "new_post";
    }

    @PostMapping("/save")
    public String savePost(@ModelAttribute("post") Post post) {
        postService.save(post);
        return "redirect:/post/";
    }

    @RequestMapping("/delete/{id}")
    public String deletePost(@PathVariable(name = "id") int id) {
        postService.delete(id);
        return "redirect:/post/";
    }

    @GetMapping("/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable Integer postId){
        try{
            Post post = postService.getPostByID(postId);
            return ResponseEntity.ok(post);
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @RequestMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Integer postId){
        try{
            postService.likePost(postId);
            return ResponseEntity.ok(new String[]{"Post liked successfully."});
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}