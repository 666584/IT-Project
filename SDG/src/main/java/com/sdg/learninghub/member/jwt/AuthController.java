package com.sdg.learninghub.member.jwt;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.sdgmodule.SdgProgressDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {
	
	private final JwtTokenProvider jwtTokenProvider;
	
	@PostMapping("/auth")
	public String Auth(@RequestBody AuthDTO authDTO) {
		String accessToken = authDTO.getAccessToken();
		System.out.println(accessToken);
		if(jwtTokenProvider.validateToken(accessToken)){
			return "authorised";
		}
		return "invalidate_token";
	}
}
