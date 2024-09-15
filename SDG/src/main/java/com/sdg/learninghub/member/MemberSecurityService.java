package com.sdg.learninghub.member;

import java.util.Collections;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MemberSecurityService implements UserDetailsService{
	
	private final MemberRepository memberRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws
UsernameNotFoundException {
		Optional<MemberEntity> user = this.memberRepository.findByEmail(email);
		// Should check the provider is LOCAL
		if(user.isEmpty()) {
			new UsernameNotFoundException("USER_NOT_FOUND");
		}
		MemberEntity memberEntity = user.get();
		List<GrantedAuthority>	authorities = new ArrayList<>();
		if("admin".equals(email)) {
			authorities.add(new SimpleGrantedAuthority(MemberRole.ADMIN.getValue()));
		} else {
			authorities.add(new SimpleGrantedAuthority(MemberRole.USER.getValue()));
		}
		return new User(memberEntity.getUsername(), memberEntity.getPassword(), authorities);
	}
}


