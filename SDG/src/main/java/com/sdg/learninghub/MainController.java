package com.sdg.learninghub;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sdg.learninghub.member.UserCreateForm;

import org.springframework.dao.DataIntegrityViolationException;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Controller
public class MainController {
	@GetMapping("/main")
	public String main() {
		return "main";
	}
}