package com.sdg.learninghub.member.jwt;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.sdgmodule.SdgProgressSaveDTO;
import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.UserDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthRepository authRepository;
	private final AuthService authService;
	
	@PostMapping("/auth")
	public Long Auth(@RequestBody AuthDTO authDTO) {
		String accessToken = authDTO.getAccessToken();
		MemberEntity user = authService.getUser(accessToken);
		if(user != null) {
			return user.getId();
		}
		return null;
	}
}
