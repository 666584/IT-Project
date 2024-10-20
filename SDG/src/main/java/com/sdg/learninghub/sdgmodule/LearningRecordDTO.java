package com.sdg.learninghub.sdgmodule;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearningRecordDTO {
	
	private String username;
	
	private int currPoint;
	
	private int spentPoints;
	
	private int totalSDGProgress;

	private int numCompletedSDG;

	private int numReward;
	
	public LearningRecordDTO(String username, int currPoint, int spentPoints, 
			int totalSDGProgress, int numCompletedSDG, int numReward) {
		this.username = username;
		this.currPoint = currPoint;
		this.spentPoints = spentPoints;
		this.totalSDGProgress = totalSDGProgress;
		this.numCompletedSDG = numCompletedSDG;
		this.numReward = numReward;
	}
}
