package com.sdg.learninghub.sdgmodule;

import com.sdg.learninghub.member.MemberEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "learning_record")
public class LearningRecord {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="learning_id")
	private Long id;	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userid")
	private MemberEntity user;
	
	@Column
	private int currPoint;
	
	@Column
	private int spentPoints;
	
	@Column
	private int totalSDGProgress;
	
	@Column
	private int numCompletedSDG;
	
	@Column
	private int numReward;
	
	public LearningRecord() {}
	
	public LearningRecord(MemberEntity user) {
		this.user = user;
		currPoint = 0;
		spentPoints = 0;
		totalSDGProgress = 0;
		numCompletedSDG = 0;
		numReward = 0;
	}
	
	public void increaseCurrPoint(int value) {
		currPoint += value;
	}
	
	public void decreaseCurrPoint(int value) {
		currPoint -= value;
	}
	
	public void increaseSpentPoints(int value) {
		spentPoints += value;
	}
	
	public void increaseTotalSDGProgress(int value) {
		totalSDGProgress += value;
	}
	
	public void increaseNumCompletedSDG(int value) {
		numCompletedSDG += value;
	}
	
	public void increaseNumReward() {
		numReward += 1;
	}
}
