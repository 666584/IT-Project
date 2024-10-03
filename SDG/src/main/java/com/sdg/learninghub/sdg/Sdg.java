package com.sdg.learninghub.sdg;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "goal")
public class Sdg {

    @Id
    @Column(name = "goal_id")
    private Long id;

    private String title;
    
    private String content;
    
    public Sdg() {
    }
    
    public Sdg(Long id, String title) {
		this.id = id;
		this.title = title;
	}

	@Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Sdg other = (Sdg) obj;
        return id == other.id;
    }

    @Override
    public String toString() {
        return "Sdg [title=" +  title  + "]";
    }
}