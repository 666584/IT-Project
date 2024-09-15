package com.sdg.learninghub.member;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SecurityMemberDetailsDTO implements UserDetails{

	private MemberEntity memberEntity;
	private Collection<? extends GrantedAuthority> authorities;
	
	public SecurityMemberDetailsDTO(MemberEntity memberEntity) {
		this.memberEntity = memberEntity;
	}
	
	@Override
	public Collection <? extends GrantedAuthority> getAuthorities() {
		return Collections.singletonList(new SimpleGrantedAuthority(memberEntity.getRole().getValue()));
	}
	
	@Override
	public String getPassword() {
		return memberEntity.getPassword();
	}
	
	@Override
	public String getUsername() {
		return memberEntity.getUsername();
	}
	
	public Long getId() {
    	return memberEntity.getId();
    }
    
    public String getEmail() {
    	return memberEntity.getEmail();
    }
	
	@Override
	public boolean isAccountNonExpired() {
		return false;
	}
	
	@Override
    public boolean isAccountNonLocked() {
        return false;
    }
	
}
