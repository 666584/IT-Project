package com.sdg.learninghub;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import com.sdg.learninghub.sdg.SdgRepository;
import com.sdg.learninghub.sdg.Sdg;
 
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
@Rollback(false)
public class GoalRepositoryTests {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private SdgRepository sdgRepository;
	
	@Test
	@DisplayName("Test 1: Store member data in repository.")
	public void testCreateMember() {
		Sdg goal = new Sdg();
		goal.setTitle("TestGoal1");
		goal.setContent("This is a content for testGoal 1.");
		
		Sdg savedGoal = sdgRepository.save(goal);
		Sdg existGoal = entityManager.find(Sdg.class, savedGoal.getId());	     
		assertThat(goal.getTitle()).isEqualTo(existGoal.getTitle());
		assertThat(goal.getContent()).isEqualTo(existGoal.getContent());
	}
}