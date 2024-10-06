package com.sdg.learninghub.post;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

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

    @RequestMapping("/edit/{id}")
    public ModelAndView showEditPostPage(@PathVariable(name = "id") int id) {
        ModelAndView mav = new ModelAndView("edit_post");
        Post post = postService.get(id);
        mav.addObject("post", post);
        return mav;
    }

    @RequestMapping("/delete/{id}")
    public String deletePost(@PathVariable(name = "id") int id) {
        postService.delete(id);
        return "redirect:/post/";
    }
}