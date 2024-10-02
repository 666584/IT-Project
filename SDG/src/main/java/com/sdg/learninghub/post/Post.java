package com.sdg.learninghub.post;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="post_id")
    private Integer post_id;

    @Column(nullable = false)
    private Integer user_id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String last_update;

    @Column(length = 10000)
    private String content;
}
