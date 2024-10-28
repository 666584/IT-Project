package com.sdg.learninghub.post;

import java.time.LocalDateTime;

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
    private Long userid;
    
}
