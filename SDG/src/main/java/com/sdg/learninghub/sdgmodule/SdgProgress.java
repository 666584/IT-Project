package com.sdg.learninghub.sdgmodule;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class SdgProgress {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "progress_id")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private MemberEntity member;
	 
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "goal_id")
	private Sdg goal; 
	 
	private boolean overview;
	
	private boolean targets;
	
	private boolean progress;
	
	private boolean completed;
	
	public boolean checkAllCompleted() {
		if(completed) {
			return false;
		}
		else if(overview && targets && progress) {
			completed = true;
			return true;
		}
		return false;
	}
	
	public boolean markAsCompleted(String task) {		
		if("overview".equalsIgnoreCase(task)) {
			if(overview == true) {
				return false;
			}
			this.overview = true;
		} else if ("targets".equalsIgnoreCase(task)) {
			if(targets == true) {
				return false;
			}
	        this.targets = true;
	    } else if ("progress".equalsIgnoreCase(task)) {
	    	if(progress == true) {
				return false;
			}
	        this.progress = true;
	    } else {
			return false;
	    }	
		
		return true;
	}
}
