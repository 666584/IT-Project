package com.sdg.learninghub.article;

import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


import java.util.List;

@Controller
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @RequestMapping("/article")
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

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public String saveArticle(@ModelAttribute("article") Article article) {
        articleService.save(article);

        return "redirect:/article";
    }
}
