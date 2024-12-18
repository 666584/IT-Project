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
public class PostServerController {
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
    public String deletePost(@PathVariable(name = "id") Long id) {
        postService.delete(id);
        return "redirect:/post/";
    }

    @RequestMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable Long postId){
        try{
            postService.likePost(postId);
            return ResponseEntity.ok(new String[]{"Post liked successfully."});
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}