package com.sdg.learninghub;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import com.sdg.learninghub.member.MemberSecurityService;
import com.sdg.learninghub.member.MemberService;

@SpringBootTest
@MapperScan(value="com.sdg.learninghub.member.mapper")
@Transactional
@Rollback(true)
public class LoginTests {
	
	@Autowired
	private MemberSecurityService memberSecurityService;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Test
	public void testLogin() {
		String email = "test1@gmail.com";
		String password = "1111";
		UserDetails userDetails = memberSecurityService.loadUserByUsername(email);        
        assertTrue(passwordEncoder.matches(password,userDetails.getPassword()));
	}
}
