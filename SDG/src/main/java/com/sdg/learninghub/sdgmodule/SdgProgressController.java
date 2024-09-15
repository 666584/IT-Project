package com.sdg.learninghub.sdgmodule;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.member.jwt.Auth;
import com.sdg.learninghub.member.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/goal")
public class SdgProgressController {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final SdgProgressService sdgProgressService;

	@PostMapping("/module")
	public ResponseEntity<String> module(@RequestBody SdgProgressDTO sdgProgressDTO) {
		
		String accessToken = sdgProgressDTO.getAccessToken();
		String goalTitle = sdgProgressDTO.getGoalTitle();
		sdgProgressService.markAsCompleted(accessToken, goalTitle);
		
		return ResponseEntity.ok("Progress saved.");
	}
}
