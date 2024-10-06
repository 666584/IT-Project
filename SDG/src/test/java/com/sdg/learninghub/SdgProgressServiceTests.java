package com.sdg.learninghub;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
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
import com.sdg.learninghub.sdgmodule.LearningRecord;
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
	private LearningRecord learningRecord;
	
	@BeforeEach
	public void init() {
		MockitoAnnotations.openMocks(this);
		
		user = new MemberEntity();
        user.setId(1L);
        
        goal = new Sdg();
        goal.setId(1L);
        
        sdgProgress = new SdgProgress();
        sdgProgress.setMember(user);
        sdgProgress.setGoal(goal);
        
        learningRecord = new LearningRecord(user);
	}
	
	@Test
	public void testSaveSdgProgress_NewProgress() {
		when(sdgProgressRepository.findByMemberIdAndGoalId(user.getId(), goal.getId()))
        .thenReturn(Optional.empty());
		
		SdgProgress result = sdgProgressService.saveSdgProgress(user, goal);
		
		assertNotNull(result);
		assertEquals(user, result.getMember());
		assertEquals(goal, result.getGoal());
		
		verify(sdgProgressRepository).save(result);
	}
	
	@Test
	public void testSaveSdgProgress_ExistingProgress() {
		
		when(sdgProgressRepository.findByMemberIdAndGoalId(user.getId(), goal.getId()))
        .thenReturn(Optional.of(sdgProgress));
		
		SdgProgress result = sdgProgressService.saveSdgProgress(user, goal);
		                              
		assertNotNull(result);
		assertEquals(sdgProgress, result);
		
		verify(sdgProgressRepository, never()).save(any(SdgProgress.class));
	}
	
	@Test
	public void testSaveLearningReocrd_NewRecord() {
		when(learningRecordRepository.findByUserId(user.getId()))
        .thenReturn(Optional.empty());
		
		LearningRecord result = sdgProgressService.saveLearningRecord(user);
		
		assertNotNull(result);
		assertEquals(user, result.getUser());
		
		verify(learningRecordRepository).save(result);
	}
	
	@Test
	public void testSaveLearningReocrd_ExistingRecord() {
		when(learningRecordRepository.findByUserId(user.getId()))
        .thenReturn(Optional.of(learningRecord));
		
		LearningRecord result = sdgProgressService.saveLearningRecord(user);
		
		assertNotNull(result);
		assertEquals(learningRecord, result);
		
		verify(learningRecordRepository, never()).save(any(LearningRecord.class));
	}
}
