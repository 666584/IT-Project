package com.sdg.learninghub.post;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private MemberService memberService;
    
    public List<Post> listAll() {
        return postRepository.findAll();
    }
    
    public List<PostDTO> listByUser(Long userId) {
    	List<Post> posts = postRepository.findByUserid(userId);
    	List<PostDTO> postList = new ArrayList<>();
    	for (Post post : posts) {
	        PostDTO postDTO = new PostDTO();
	        postDTO.setUsername(post.getMember().getUsername());
	        postDTO.setTitle(post.getTitle());
	        postDTO.setPostId(post.getPostId());
	        postDTO.setContent(post.getContent());
	        postDTO.setDate(post.getDate());
	        postDTO.setLikeCount(post.getLikeCount());
	        postList.add(postDTO);
    	}
    	return postList;
    }
    
    public Long create(PostCreateDTO postCreateDTO) {
    	MemberEntity member = memberService.getMember(postCreateDTO.getUserid());
    	Post post = new Post();
    	post.setMember(member);
    	post.setContent(postCreateDTO.getContent());
    	post.setTitle(postCreateDTO.getTitle());
    	post.setDate(postCreateDTO.getDate());
    	save(post);
    	return post.getPostId();
    }
    
    public Long update(PostDTO postDTO) {
    	System.out.println(postDTO.getPostId());
    	Post post = postRepository.findByPostId(postDTO.getPostId());
    	post.updateContent(postDTO.getContent());
    	post.updateTitle(postDTO.getTitle());
    	post.updateDate(postDTO.getDate());
    	postRepository.save(post);
    	return post.getPostId();
    }

    /** save the new created post*/
    public void save(Post post) {
        post.setLikeCount(0);
        postRepository.save(post);
    }

    /** Count the likes of the post*/
    public void likePost(Long postId){
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()){
            Post post = optionalPost.get();
            post.setLikeCount(post.getLikeCount() + 1);
            postRepository.save(post);
        } else {
            throw new EntityNotFoundException("Post not found with id: " + postId);
        }
    }

    public void delete(Long id) {
        postRepository.deleteById(id);
    }
}
