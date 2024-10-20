package com.sdg.learninghub.post;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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

    private String postedBy;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Date lastUpdate;

    @Column(length = 10000)
    private String content;

    private int likeCount;

    private int viewCount;

}
