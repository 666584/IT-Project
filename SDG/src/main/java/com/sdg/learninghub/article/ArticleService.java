package com.sdg.learninghub.article;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public List<Article> listAll() {
        return articleRepository.findAll();
    }

    public void save(Article article) {
        articleRepository.save(article);
    }

    public Article get(int id) {
        return articleRepository.findById(id).get();
    }

    public void delete(int id) {
        articleRepository.deleteById(id);
    }
}

