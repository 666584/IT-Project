package com.sdg.learninghub.sdg;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Sdg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer goal_id;

    @Column(unique = true, length = 255)
    private String title;

    @Column(length = 10000)
    private String content;

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Sdg other = (Sdg) obj;
        return goal_id.equals(other.goal_id);
    }

    @Override
    public String toString() {
        return "Sdg [title=" +  title + ", content=" + content + "]";
    }

}