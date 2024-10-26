package com.sdg.learninghub.post;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Long>{
	
	@Query("SELECT p FROM Post p WHERE p.member.userid = ?1")
	List<Post> findByUserid(Long userid);
	
	Post findByPostId(Long postId);
	
	List<Post> findTop5ByOrderByLikeCountDesc();
}

