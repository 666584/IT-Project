package com.sdg.learninghub.member;

import java.util.Optional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.sdg.learninghub.member.mapper.MemberMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberService {
	private final MemberMapper memberMapper;
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
		memberEntity.setFirstname(firstName);
		memberEntity.setLastname(lastName);
		memberEntity.setRole(MemberRole.USER);
		memberEntity.setProvider(Provider.LOCAL);
		this.memberMapper.addMember(memberEntity);
		return memberEntity;
	}
	
	@Transactional
	public MemberEntity createFromGoogle(String email, String firstName, String lastName) {
		MemberEntity memberEntity = new MemberEntity();
		String username = email.substring(0, email.indexOf("@"));
		memberEntity.setUsername(username);
		memberEntity.setEmail(email);
		memberEntity.setPassword(null);
		memberEntity.setFirstname(firstName);
		memberEntity.setLastname(lastName);
		memberEntity.setRole(MemberRole.USER);
		memberEntity.setProvider(Provider.GOOGLE);
		this.memberMapper.addMember(memberEntity);
		return memberEntity;
	}
	
	public MemberEntity getMember(Long id) {
		Optional<MemberEntity> member = this.memberMapper.findById(id);
		if (member.isPresent()) {
			return member.get();
		} else {
			throw new EntityNotFoundException("User does not exist.");
		}
	}
	
	public MemberEntity getMemberByEmail(String email) {
		Optional<MemberEntity> member = this.memberMapper.findByEmail(email);
		if (member.isPresent()) {
			return member.get();
		} else {
			return null;
		}
	}
}
