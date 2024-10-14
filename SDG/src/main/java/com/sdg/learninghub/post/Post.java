package com.sdg.learninghub.post;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="post_id")
    private Integer postId;

    @Column(nullable = false)
    private Integer userId;

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
