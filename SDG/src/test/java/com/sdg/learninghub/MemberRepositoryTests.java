package com.sdg.learninghub;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberRole;
import com.sdg.learninghub.member.Provider;
import com.sdg.learninghub.member.mapper.MemberMapper;


@SpringBootTest
@MapperScan(value="com.sdg.learninghub.member.mapper")
@Transactional
@Rollback(true)
public class MemberRepositoryTests {
	
	@Autowired
	private MemberMapper memberMapper;
	
	private MemberEntity memberEntity;
	
	@BeforeEach
	public void setUp() {
        memberEntity = new MemberEntity();
        memberEntity.setEmail("test@gmail.com");
        memberEntity.setPassword("1234");
        memberEntity.setFirstname("test");
        memberEntity.setLastname("test");
        memberEntity.setUsername("test2");
        memberEntity.setRole(MemberRole.USER);
        memberEntity.setProvider(Provider.LOCAL);
		memberMapper.addMember(memberEntity);
    }
	
	@Test
	@DisplayName("Test 1: Store member data in repository.")
	public void testCreateMember() {
		Optional<MemberEntity> existMembers = memberMapper.findByUsername("test2");
		if(existMembers.isPresent()) {
			MemberEntity existMember = existMembers.get();
			assertThat(memberEntity.getEmail()).isEqualTo(existMember.getEmail());
			assertThat(memberEntity.getPassword()).isEqualTo(existMember.getPassword());
		} else {
			fail("Not exist.");
		}
	}
	
	@Test
	@DisplayName("Test 2: Get member data by email")
	public void testGetMemberByEmail() {
		Optional<MemberEntity> existMembers = memberMapper.findByEmail("test@gmail.com");
		if(existMembers.isPresent()) {
			MemberEntity existMember = existMembers.get();
			assertThat(memberEntity.getEmail()).isEqualTo(existMember.getEmail());
			assertThat(memberEntity.getPassword()).isEqualTo(existMember.getPassword());
		} else {
			fail("Not exist.");
		}
	}
	
	@Test
	@DisplayName("Test 3: Get member data by email and provider")
	public void testGetMemberByEmailAndProvider() {
		Optional<MemberEntity> existMembers = memberMapper.findByEmailAndProvider("test@gmail.com", Provider.LOCAL);
		if(existMembers.isPresent()) {
			MemberEntity existMember = existMembers.get();
			assertThat(memberEntity.getEmail()).isEqualTo(existMember.getEmail());
			assertThat(memberEntity.getPassword()).isEqualTo(existMember.getPassword());
		} else {
			fail("Not exist.");
		}
	}
}
