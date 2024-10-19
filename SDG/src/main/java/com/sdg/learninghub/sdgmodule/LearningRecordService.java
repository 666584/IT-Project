package com.sdg.learninghub.sdgmodule;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sdg.learninghub.member.MemberEntity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LearningRecordService {
	
	private final LearningRecordRepository learningRecordRepository;
	private final int POINT = 50;
	
	public LearningRecordDTO getLearningRecordDTO(MemberEntity user) {
		LearningRecord learningRecord = saveLearningRecord(user);
		return new LearningRecordDTO(learningRecord.getUser().getUsername(), 
				learningRecord.getCurrPoint(), learningRecord.getSpentPoints(), learningRecord.getTotalSDGProgress(), 
				learningRecord.getNumCompletedSDG(), learningRecord.getNumReward());
	}
	
	public LearningRecord saveLearningRecord(MemberEntity user) {
		Optional<LearningRecord> existedRecord = learningRecordRepository.findByUser_Userid(user.getUserid());
		LearningRecord record;
		
		if(existedRecord.isEmpty()) {
			record = new LearningRecord(user);
		}else {
			record = existedRecord.get();
		}
		
		learningRecordRepository.save(record);		
		return record;
	}
	
	public void updateLearningRecord(LearningRecord record, boolean allTaskCompleted) {
		record.increaseCurrPoint(POINT);
		record.increaseTotalSDGProgress(POINT);
		
		if(allTaskCompleted) {
			record.increaseNumCompletedSDG(1);
		}
		
		learningRecordRepository.save(record);	
	}
}
