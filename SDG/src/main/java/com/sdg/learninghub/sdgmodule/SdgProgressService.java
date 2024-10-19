package com.sdg.learninghub.sdgmodule;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.sdg.Sdg;
import com.sdg.learninghub.sdg.SdgRepository;
import com.sdg.learninghub.member.jwt.Auth;
import com.sdg.learninghub.member.jwt.AuthRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SdgProgressService {
	
	private final SdgProgressRepository sdgProgressRepository;
	private final AuthRepository authRepository;
	private final SdgRepository sdgRepository;
	private final LearningRecordService learningRecordService;
	
	public void saveProgress(String accessToken, String goalTitle, String task) {
		Optional<Auth> auths = authRepository.findByAccessToken(accessToken);
		
		if(auths.isEmpty()) {
			throw new IllegalArgumentException("Cannot find authority of user.");
		}
		
		Auth authUser = auths.get();
		Optional<Sdg> sdgs = sdgRepository.findByTitle(goalTitle);
		
		if(sdgs.isEmpty()) {
			throw new IllegalArgumentException("Cannot find sdg.");
		}
		
		Sdg goal = sdgs.get();
		MemberEntity member = authUser.getUser();
		SdgProgress progress = saveSdgProgress(member, goal);
		LearningRecord record = learningRecordService.saveLearningRecord(member);

		if(progress.markAsCompleted(task)) {
			sdgProgressRepository.save(progress);
			boolean allTaskCompleted = progress.checkAllCompleted();
			learningRecordService.updateLearningRecord(record, allTaskCompleted);			
		}
	
	}
	
	public SdgProgress saveSdgProgress(MemberEntity user, Sdg goal) {
		Optional<SdgProgress> existedProgress = sdgProgressRepository.findByMemberUseridAndGoalId(user.getUserid(), goal.getId());
		SdgProgress progress;
		
		if(existedProgress.isEmpty()) {
			progress = new SdgProgress();
			progress.setMember(user);
			progress.setGoal(goal);
		}else {
			progress = existedProgress.get();
		}
		
		sdgProgressRepository.save(progress);
		return progress;
	}
}
