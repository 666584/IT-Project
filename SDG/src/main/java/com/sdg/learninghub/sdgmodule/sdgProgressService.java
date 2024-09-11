package com.sdg.learninghub.sdgmodule;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.sdg.Sdg;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class sdgProgressService {
	
	private final sdgProgressRepository sdgProgressRepository;

	public void markAsCompleted(MemberEntity member, Sdg goal) {
		sdgProgress progress = new sdgProgress();
		progress.setMember(member);
		progress.setGoal(goal);
		progress.setCompleted(true);
		
		sdgProgressRepository.save(progress);
	}
}
