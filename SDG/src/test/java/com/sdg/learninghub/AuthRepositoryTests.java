package com.sdg.learninghub;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberRole;
import com.sdg.learninghub.member.jwt.Auth;
import com.sdg.learninghub.member.jwt.AuthService;
import com.sdg.learninghub.member.mapper.MemberMapper;

@SpringBootTest
@MapperScan(value="com.sdg.learninghub.member.mapper")
@Transactional
@Rollback(true)
public class AuthRepositoryTests {
	
	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired 
	private AuthService authService;
	
	@Test
	@DisplayName("Test 1: Create Auth for existing user.")
	public void testCreateAuthForExistingUser() {
	    MemberEntity memberEntity = new MemberEntity();
	    memberEntity.setEmail("test@gmail.com");
	    memberEntity.setPassword("1234");
	    memberEntity.setFirstname("test");
	    memberEntity.setLastname("test");
	    memberEntity.setUsername("test2");
	    memberEntity.setRole(MemberRole.USER);
	    
	    memberMapper.addMember(memberEntity);
	    
	    Optional<MemberEntity> members = memberMapper.findByEmail("test@gmail.com");
	    if(members.isEmpty()) {
	    	fail("Not success.");
	    }
	    MemberEntity member = members.get();
	    System.out.println(member.getEmail());

	    Auth auth = authService.create(member, "Bearer", "access_token", "refresh_token");
	    System.out.println(auth.getUser().getEmail());
	    assertThat(auth).isNotNull();
	    assertThat(auth.getUser().getEmail()).isEqualTo(memberEntity.getEmail());
	}
}
