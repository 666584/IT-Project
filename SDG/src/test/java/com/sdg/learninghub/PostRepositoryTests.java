package com.sdg.learninghub;

import static org.assertj.core.api.Assertions.assertThat;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.mapper.MemberMapper;
import com.sdg.learninghub.post.Post;
import com.sdg.learninghub.post.PostRepository;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.junit.jupiter.api.DisplayName;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;


@SpringBootTest
@MapperScan(value="com.sdg.learninghub.member.mapper")
@Transactional
@Rollback(true)
public class PostRepositoryTests {

    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private MemberMapper memberMapper;

    @Test
    @DisplayName("Test 1: Store post in repository.")
    public void testCreateMember() {
    	Optional<MemberEntity> members = memberMapper.findByEmail("test1@gmail.com");
        MemberEntity member = members.get();
    	Post post = new Post();
        post.setPostId(2L);
        post.setMember(member);
        post.setLastUpdate(new Date());
        post.setPostedBy("Vivian");
        post.setTitle("Zero Hunger");
        post.setContent("End hunger, achieve food security and improved nutrition and promote sustainable agriculture");
        post.setViewCount(0);
        post.setLikeCount(0);

        Post savedPost = postRepository.save(post);
        Optional<Post> existPosts = postRepository.findById(savedPost.getPostId());
        Post existPost = existPosts.get();
        assertThat(post.getTitle()).isEqualTo(existPost.getTitle());
        assertThat(post.getContent()).isEqualTo(existPost.getContent());
    }
}