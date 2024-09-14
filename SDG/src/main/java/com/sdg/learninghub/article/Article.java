package com.sdg.learninghub.article;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="article_id")
    private Integer article_id;

    @Column(unique = true)
    private Integer admin_id;

    @Column(unique = true)
    private String title;

    @Column(unique = true)
    private String last_update;

    @Column(length = 10000)
    private String content;
}
