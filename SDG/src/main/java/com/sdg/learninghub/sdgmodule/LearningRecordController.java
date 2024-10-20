package com.sdg.learninghub.sdgmodule;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberService;
import com.sdg.learninghub.member.UserDao;
import com.sdg.learninghub.sdg.SdgService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/dashboard")
public class LearningRecordController {
	private final LearningRecordService learningRecordService;
	
	@PostMapping("/coupon")
	public ResponseEntity<String> coupon(@RequestBody UserDao user) {
		Long userId = user.getUserId();
		learningRecordService.redeemCoupon(userId);
		return ResponseEntity.ok("Learning record saved.");
	}
}
