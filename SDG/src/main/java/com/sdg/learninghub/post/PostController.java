package com.sdg.learninghub.post;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/post")
public class PostController {
	
	private final PostService postService;
	
	@PostMapping("/create")
	public ResponseEntity<Long> CreatePost(@RequestBody PostCreateDTO postCreateDTO){
		Long postId = postService.create(postCreateDTO);
		if(postId == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(postId);
	}
	
	@PostMapping("/update")
	public ResponseEntity<Long> UpdatePost(@RequestBody PostDTO postDTO){
		Long postId = postService.update(postDTO);
		if(postId == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(postId);
	}
	
	@GetMapping("/list/{userId}")
	public ResponseEntity<List<PostDTO>> ListPostByUser(@PathVariable(name = "userId") Long userId) {		
		List<PostDTO> postList = postService.listByUser(userId);
		return ResponseEntity.status(HttpStatus.OK).body(postList);
	}
	
	@GetMapping("/list")
	public ResponseEntity<List<PostDTO>> ListPostByLike(){
		List<PostDTO> postList = postService.listByLike();
		return ResponseEntity.status(HttpStatus.OK).body(postList);
	}
}
