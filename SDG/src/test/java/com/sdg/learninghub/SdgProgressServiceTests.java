package com.sdg.learninghub;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.sdg.Sdg;
import com.sdg.learninghub.sdgmodule.LearningRecordRepository;
import com.sdg.learninghub.sdgmodule.SdgProgress;
import com.sdg.learninghub.sdgmodule.SdgProgressRepository;
import com.sdg.learninghub.sdgmodule.SdgProgressService;

public class SdgProgressServiceTests {
	
	@Mock
	private SdgProgressRepository sdgProgressRepository;
	
	@Mock
	private LearningRecordRepository learningRecordRepository;
	
	@InjectMocks
	private SdgProgressService sdgProgressService;
	
	private MemberEntity user;
	private Sdg goal;
	private SdgProgress sdgProgress;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
		
		user = new MemberEntity();
        user.setUserid(1L);
        
        goal = new Sdg();
        goal.setId(1L);
        
        sdgProgress = new SdgProgress();
        sdgProgress.setMember(user);
        sdgProgress.setGoal(goal);
	}
	
	@Test
	public void testSaveSdgProgress_NewProgress() {
		when(sdgProgressRepository.findByMemberUseridAndGoalId(user.getUserid(), goal.getId()))
        .thenReturn(Optional.empty());
		
		SdgProgress result = sdgProgressService.saveSdgProgress(user, goal);
		
		assertNotNull(result);
		assertEquals(user, result.getMember());
		assertEquals(goal, result.getGoal());
		
		verify(sdgProgressRepository).save(result);
	}
	
	@Test
	public void testSaveSdgProgress_ExistingProgress() {
		
		when(sdgProgressRepository.findByMemberUseridAndGoalId(user.getUserid(), goal.getId()))
        .thenReturn(Optional.of(sdgProgress));
		
		SdgProgress result = sdgProgressService.saveSdgProgress(user, goal);
		                              
		assertNotNull(result);
		assertEquals(sdgProgress, result);
		
		verify(sdgProgressRepository).save(result);
	}
}
