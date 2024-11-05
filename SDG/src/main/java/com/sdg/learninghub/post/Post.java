package com.sdg.learninghub.post;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import com.sdg.learninghub.member.MemberEntity;

@Getter
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="post_id")
    private Long postId;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userid")
	private MemberEntity member;

    @Column(nullable = false)
    private String title;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(length = 10000)
    private String content;

    private int likeCount;
    
    public void updateTitle(String title) {
    	this.title = title;
    }
    
    public void updateContent(String content) {
    	this.content = content;
    }
    
    public void updateDate(LocalDateTime date) {
    	this.date = date;
    }
    
    public ZonedDateTime changeTimeZone() {
    	return this.date.atZone(ZoneId.of("Australia/Sydney"));
    }
}
