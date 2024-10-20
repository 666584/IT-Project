package com.sdg.learninghub.member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberRole {
	USER("ROLE_USER"),
	ADMIN("ROLE_ADMIN");
	
	MemberRole(String value) {
		this.value = value;
	}
	
	private String value;
}
