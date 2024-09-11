package com.sdg.learninghub.sdgmodule;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Table;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.sdg.Sdg;

@Getter
@Setter
@Entity
@Table(name = "goal_progress")
public class sdgProgress {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="progress_id")
	private Long id;
	
	 @ManyToOne
	 @JoinColumn(name = "user_id")
	 private MemberEntity member;
	 
	 @ManyToOne
	 @JoinColumn(name = "goal_id")
	 private Sdg goal;
	 
	 private boolean completed;
}
