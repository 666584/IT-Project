package com.sdg.learninghub.member;

import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	
	/**
	 * 
	 * @param username
	 * @param email
	 * @param password
	 * @param firstName
	 * @param lastName
	 * @return member
	 */
	
	@Transactional
	public MemberEntity create(String username, String email, String password, String firstName, String lastName) {
		MemberEntity memberEntity = new MemberEntity();
		memberEntity.setUsername(username);
		memberEntity.setEmail(email);
		memberEntity.setPassword(passwordEncoder.encode(password));
		memberEntity.setFirstName(firstName);
		memberEntity.setLastName(lastName);
		memberEntity.setRole(MemberRole.USER);
		memberEntity.setProvider(Provider.LOCAL);
		this.memberRepository.save(memberEntity);
		return memberEntity;
	}
}
