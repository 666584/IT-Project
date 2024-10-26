package com.sdg.learninghub.post;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
   
	private Long postId;
	private String username;
	private String title;
	private String content;
	private LocalDateTime date;
    private int likeCount;
    
}
