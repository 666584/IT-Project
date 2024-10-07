package com.sdg.learninghub.sdgmodule;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class SdgProgressController {
	
	private final SdgProgressService sdgProgressService;
	private final MemberService memberService;
	private final LearningRecordService learningRecordService;
	
	@PostMapping("/goal/module")
	public ResponseEntity<String> module(@RequestBody SdgProgressDTO sdgProgressInputDTO) {
		
		String accessToken = sdgProgressInputDTO.getAccessToken();
		String goalTitle = sdgProgressInputDTO.getGoalTitle();
		String goalTask = sdgProgressInputDTO.getGoalTask();
		sdgProgressService.saveProgress(accessToken, goalTitle, goalTask);
		
		return ResponseEntity.ok("Progress saved.");
	}
	
	@GetMapping("/dashboard/{userId}")
	public  ResponseEntity<LearningRecordDTO> ProgressData(@PathVariable(name = "userId") Long userId) {		
		MemberEntity member = memberService.getMember(userId);
		if(member == null) {
			return null;
		}
		
		LearningRecordDTO recordData = learningRecordService.getLearningRecordDTO(member);
		
		return ResponseEntity.ok(recordData);
	}
}
