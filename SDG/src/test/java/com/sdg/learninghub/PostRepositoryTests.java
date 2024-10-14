package com.sdg.learninghub;

import static org.assertj.core.api.Assertions.assertThat;


import com.sdg.learninghub.post.Post;
import com.sdg.learninghub.post.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.util.Date;


@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class PostRepositoryTests {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private PostRepository postRepository;

    @Test
    @DisplayName("Test 1: Store member data in repository.")
    public void testCreateMember() {
        Post post = new Post();
        post.setPostId(2);
        post.setUserId(2);
        post.setLastUpdate(new Date());
        post.setPostedBy("Vivian");
        post.setTitle("Zero Hunger");
        post.setContent("End hunger, achieve food security and improved nutrition and promote sustainable agriculture");
        post.setViewCount(0);
        post.setLikeCount(0);

        Post savedPost = postRepository.save(post);
        Post existPost = entityManager.find(Post.class, savedPost.getPostId());
        assertThat(post.getTitle()).isEqualTo(existPost.getTitle());
        assertThat(post.getContent()).isEqualTo(existPost.getContent());
    }
}