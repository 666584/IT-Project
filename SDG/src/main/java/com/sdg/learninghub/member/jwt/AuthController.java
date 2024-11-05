package com.sdg.learninghub.member.jwt;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.member.MemberEntity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {
	
	private final AuthService authService;
	
	@PostMapping("/auth")
	public Long Auth(@RequestBody AuthDTO authDTO) {
		String accessToken = authDTO.getAccessToken();
		MemberEntity user = authService.getUser(accessToken);
		if(user != null) {
			return user.getUserid();
		}
		return null;
	}
}
