package com.sdg.learninghub.sdgmodule;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberService;
import com.sdg.learninghub.sdg.Sdg;
import com.sdg.learninghub.sdg.SdgService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class SdgProgressController {
	
	private final SdgProgressService sdgProgressService;
	private final SdgService sdgService;
	private final MemberService memberService;
	private final LearningRecordService learningRecordService;
	
	@PostMapping("/goal/module")
	public ResponseEntity<String> module(@RequestBody SdgProgressSaveDTO sdgProgressInputDTO) {
		
		String accessToken = sdgProgressInputDTO.getAccessToken();
		String goalTitle = sdgProgressInputDTO.getGoalTitle();
		String goalTask = sdgProgressInputDTO.getGoalTask();
		sdgProgressService.saveProgress(accessToken, goalTitle, goalTask);
		
		return ResponseEntity.ok("Progress saved.");
	}
	
	@GetMapping("/dashboard/{userId}")
	public ResponseEntity<LearningRecordDTO> recordData(@PathVariable(name = "userId") Long userId) {		
		MemberEntity member = memberService.getMember(userId);
		
		if(member == null) {
			return null;
		}
		
		LearningRecordDTO recordData = learningRecordService.getLearningRecordDTO(member);
		
		return ResponseEntity.ok(recordData);
	}
	
	@GetMapping("/goal/{title}/{userId}")
	public ResponseEntity<?> progressData(@PathVariable(name = "title") String title, 
			@PathVariable(name = "userId") Long userid) {	
		System.out.println("userid" + userid);
		System.out.println("title" + title);
		MemberEntity member = memberService.getMember(userid);
		
		if(member == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Member not found.");
		}
		
		Sdg goal = sdgService.getGoal(title);
		
		if (goal == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Goal not found.");
		}
		
		SdgProgress progress = sdgProgressService.saveSdgProgress(member, goal);
		SdgProgressViewDTO progressData = new SdgProgressViewDTO(
				progress.isOverview(), progress.isTargets(), progress.isProgress());
		return ResponseEntity.ok(progressData);
	}
}
