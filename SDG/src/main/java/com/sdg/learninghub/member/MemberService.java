package com.sdg.learninghub.member;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityNotFoundException;
//import com.sdg.learninghub.DataNotFoundException;
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
	
	@Transactional
	public MemberEntity createFromGoogle(String email, String firstName, String lastName) {
		MemberEntity memberEntity = new MemberEntity();
		String username = email.substring(0, email.indexOf("@"));
		memberEntity.setUsername(username);
		memberEntity.setEmail(email);
		memberEntity.setPassword(null);
		memberEntity.setFirstName(firstName);
		memberEntity.setLastName(lastName);
		memberEntity.setRole(MemberRole.USER);
		memberEntity.setProvider(Provider.GOOGLE);
		this.memberRepository.save(memberEntity);
		return memberEntity;
	}
	
	public MemberEntity getMember(Long id) {
		Optional<MemberEntity> member = this.memberRepository.findById(id);
		if (member.isPresent()) {
			return member.get();
		} else {
			throw new EntityNotFoundException("User does not exist.");
		}
	}
	
	public MemberEntity getMemberByEmail(String email) {
		Optional<MemberEntity> member = this.memberRepository.findByEmail(email);
		if (member.isPresent()) {
			return member.get();
		} else {
			return null;
		}
	}
}
