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
public class GoalRepositoryTests {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private SdgRepository sdgRepository;
	
	/*
	@Test
	@DisplayName("Test 1: Store goal data in repository.")
	public void testCreateMember() {
		Sdg existGoal = entityManager.find(Sdg.class, .getId());	     
		assertThat(goal.getTitle()).isEqualTo(existGoal.getTitle());
	}*/
}