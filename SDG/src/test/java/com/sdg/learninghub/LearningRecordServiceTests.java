package com.sdg.learninghub;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.sdgmodule.LearningRecord;
import com.sdg.learninghub.sdgmodule.LearningRecordRepository;
import com.sdg.learninghub.sdgmodule.LearningRecordService;

public class LearningRecordServiceTests {
	@Mock
    private LearningRecordRepository learningRecordRepository;

    @InjectMocks
    private LearningRecordService learningRecordService;

    private LearningRecord learningRecord;
    private MemberEntity user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        
        learningRecord = new LearningRecord();
        
        user = new MemberEntity();
        user.setUserid(1L);
    }
	
    @Test
	public void testUpdateLearningRecord_NotCompleted() {
    	learningRecordService.updateLearningRecord(learningRecord, false);
	
		assertEquals(50, learningRecord.getCurrPoint());
		assertEquals(50, learningRecord.getTotalSDGProgress());
		assertEquals(0, learningRecord.getNumCompletedSDG());
		
		verify(learningRecordRepository).save(learningRecord);
	}
	
	@Test
	public void testUpdateLearningRecord_AllCompleted() {		
		learningRecordService.updateLearningRecord(learningRecord, true);
		
		assertEquals(50, learningRecord.getCurrPoint());
		assertEquals(50, learningRecord.getTotalSDGProgress());
		assertEquals(1, learningRecord.getNumCompletedSDG());
	
		verify(learningRecordRepository).save(learningRecord);
	}
	
	@Test
	public void testSaveLearningReocrd_NewRecord() {
		when(learningRecordRepository.findByUser_Userid(user.getUserid()))
        .thenReturn(Optional.empty());
		
		LearningRecord result = learningRecordService.saveLearningRecord(user);
		
		assertNotNull(result);
		assertEquals(user, result.getUser());
		
		verify(learningRecordRepository).save(result);
	}
	
	@Test
	public void testSaveLearningReocrd_ExistingRecord() {
		when(learningRecordRepository.findByUser_Userid(user.getUserid()))
        .thenReturn(Optional.of(learningRecord));
		
		LearningRecord result = learningRecordService.saveLearningRecord(user);
		
		assertNotNull(result);
		assertEquals(learningRecord, result);
		
		verify(learningRecordRepository).save(result);
	}
}
