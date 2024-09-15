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
	
	private final SdgProgressRepository SdgProgressRepository;
	private final AuthRepository authRepository;
	private final SdgRepository sdgRepository;
	
	public void markAsCompleted(String accessToken, String goalTitle) {
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
		SdgProgress progress = new SdgProgress();
		progress.setMember(member);
		progress.setGoal(goal);
		progress.setCompleted(true);
		SdgProgressRepository.save(progress);
	}
}
