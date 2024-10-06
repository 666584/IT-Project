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

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberRepository;
import com.sdg.learninghub.member.MemberRole;
 
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class MemberRepositoryTests {
	
	@Autowired
	private TestEntityManager entityManager;
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Test
	@DisplayName("Test 1: Store member data in repository.")
	public void testCreateMember() {
		MemberEntity memberEntity = new MemberEntity();
		memberEntity.setEmail("test@gmail.com");
		memberEntity.setPassword("1234");
		memberEntity.setFirstName("test");
		memberEntity.setLastName("test");
		memberEntity.setUsername("test2");
		memberEntity.setRole(MemberRole.USER);
		
		MemberEntity savedMember = memberRepository.save(memberEntity);
		MemberEntity existMember = entityManager.find(MemberEntity.class, savedMember.getId());	     
		assertThat(memberEntity.getEmail()).isEqualTo(existMember.getEmail());
		assertThat(memberEntity.getPassword()).isEqualTo(existMember.getPassword());
	}
}
