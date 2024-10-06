package com.sdg.learninghub;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.sdg.learninghub.sdgmodule.SdgProgress;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class SdgProgressCompletionTest {
	private SdgProgress testProgress;

    @BeforeEach
    public void setUp() {
        testProgress = new SdgProgress();
    }
    
	@Test
    public void testAllTasksComplteted_AllTrue() {
		testProgress.setOverview(true);
		testProgress.setTargets(true);
		testProgress.setProgress(true);
		
		testProgress.checkAllCompleted();
		boolean result = testProgress.isCompleted();
		assertTrue(result, "Expected isCompleted to return true when all tasks are completed.");
	}
	
	@Test
    public void testAllTasksCompleted_OneFalse() {
		testProgress.setOverview(true);
		testProgress.setTargets(false);
		testProgress.setProgress(true);
		
		testProgress.checkAllCompleted();
		boolean result = testProgress.isCompleted();
		assertFalse(result, "Expected isCompleted to return false when at least one task is not completed.");
	}
	
	@Test
    public void testAllTasksCompleted_AllFalse() {
		testProgress.setOverview(false);
		testProgress.setTargets(false);
		testProgress.setProgress(false);
		
		testProgress.checkAllCompleted();
		boolean result = testProgress.isCompleted();
		assertFalse(result, "Expected isCompleted to return false when no tasks are completed.");
	}
	
	@Test
	public void testCompleted_Overview() {	
		testProgress.markAsCompleted("overview");
		
		assertTrue(testProgress.isOverview(), "Expected overview to be true.");
        assertFalse(testProgress.isCompleted(), "Expected completed to be false when only overview is true.");
    }
	
	@Test
    public void testCompleted_Targets() {		
		testProgress.markAsCompleted("targets");
        
		assertTrue(testProgress.isTargets(), "Expected targets to be true.");
        assertFalse(testProgress.isCompleted(), "Expected completed to be false when only targets is true.");
    }

    @Test
    public void testCompleted_Progress() {
    	testProgress.markAsCompleted("progress");

        assertTrue(testProgress.isProgress(), "Expected progress to be true.");
        assertFalse(testProgress.isCompleted(), "Expected completed to be false when only progress is true.");
    }

    @Test
    public void testCompleted_Alltasks() {
    	testProgress.markAsCompleted("overview");
    	testProgress.markAsCompleted("targets");
    	testProgress.markAsCompleted("progress");

        assertTrue(testProgress.isOverview(), "Expected overview to be true.");
        assertTrue(testProgress.isTargets(), "Expected targets to be true.");
        assertTrue(testProgress.isProgress(), "Expected progress to be true.");
        assertTrue(testProgress.isCompleted(), "Expected completed to be true when all fields are true.");
    }

    @Test
    public void testComplete_InvalidInput() {
    	testProgress.markAsCompleted("invalid");

        assertFalse(testProgress.isOverview(), "Expected overview to remain false.");
        assertFalse(testProgress.isTargets(), "Expected targets to remain false.");
        assertFalse(testProgress.isProgress(), "Expected progress to remain false.");
        assertFalse(testProgress.isCompleted(), "Expected completed to remain false.");
    }
}
