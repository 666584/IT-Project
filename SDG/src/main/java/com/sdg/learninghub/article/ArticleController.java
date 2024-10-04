package com.sdg.learninghub.article;

import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;


import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/article")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @RequestMapping("/")
    public String viewHomePage(Model model) {
        List<Article> listArticle = articleService.listAll();
        model.addAttribute("listArticle", listArticle);
        return "index_article";
    }

    @RequestMapping("/new_article")
    public String showNewProductPage(Model model) {
    Article article = new Article();
        model.addAttribute("article", article);
        return "new_article";
    }

    @PostMapping("/save")
    public String saveArticle(@ModelAttribute("article") Article article) {
        articleService.save(article);
        return "redirect:/article/";
    }

    @RequestMapping("/edit/{id}")
    public ModelAndView showEditArticlePage(@PathVariable(name = "id") int id) {
        ModelAndView mav = new ModelAndView("edit_article");
        Article article = articleService.get(id);
        mav.addObject("article", article);
        return mav;
    }

    @RequestMapping("/delete/{id}")
    public String deleteArticle(@PathVariable(name = "id") int id) {
        articleService.delete(id);
        return "redirect:/article/";
    }

}
