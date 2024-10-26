package com.sdg.learninghub.post;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostCreateDTO {
    
	private String title;
    private Long userid;
    private String content;
    private LocalDateTime date;
    
}