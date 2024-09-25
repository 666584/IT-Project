package com.sdg.learninghub;

import static org.assertj.core.api.Assertions.assertThat;

import com.sdg.learninghub.article.Article;
import com.sdg.learninghub.article.ArticleRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;


@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class ArticleRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ArticleRepository articleRepository;

    @Test
    @DisplayName("Test 1: Store member data in repository.")
    public void testCreateMember() {
        Article article = new Article();
        article.setArticle_id(2);
        article.setAdmin_id(2);
        article.setLast_update("25/09/24");
        article.setTitle("Zero Hunger");
        article.setContent("End hunger, achieve food security and improved nutrition and promote sustainable agriculture");

        Article savedArticle = articleRepository.save(article);
        Article existArticle = entityManager.find(Article.class, savedArticle.getArticle_id());
        assertThat(article.getTitle()).isEqualTo(existArticle.getTitle());
        assertThat(article.getContent()).isEqualTo(existArticle.getContent());
    }
}