package com.sdg.learninghub.member;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.member.jwt.Auth;
import com.sdg.learninghub.member.jwt.AuthService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class MemberPageController {
	
	private final MemberService memberService;
	private final MemberSecurityService memberSecurityService;
	private final PasswordEncoder passwordEncoder;
	private final AuthService authService;
	
	@GetMapping("/signup")
	public String signup(UserCreateForm userCreateForm) {
		return "signup_form";
	}
	
	@PostMapping("/signup")
	public String signup(@Valid UserCreateForm userCreateForm, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			for (FieldError error : bindingResult.getFieldErrors()) {
                System.out.println(error.getField() + ": " + error.getDefaultMessage());
            }
			return "signup_form";
		}
		
		if(!userCreateForm.getPassword1().equals(userCreateForm.getPassword2())) {
			bindingResult.rejectValue("password2", "password.mismatch", "Those passwords didn’t match. Try again.");
			return "signup_form";
		}
		
		try {
			memberService.create(userCreateForm.getUsername(), userCreateForm.getEmail(), 
					userCreateForm.getPassword1(), userCreateForm.getFirstName(), userCreateForm.getLastName());
		}catch(DataIntegrityViolationException e) {
			e.printStackTrace();
			bindingResult.rejectValue("email", "email.duplicate", "An account with this email already exists.");
			return "signup_form";
		}catch(Exception e) {
			e.printStackTrace();
			bindingResult.reject("signup.error", e.getMessage());
		}
		
		//terms.accept
		return "register_success";
	}
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody MemberEntity loginRequest) {
		String email = loginRequest.getEmail(); 
        String password = loginRequest.getPassword();
        
        UserDetails userDetails = memberSecurityService.loadUserByUsername(email); 
        if(userDetails == null) { 
            System.out.println("Sign in details - null" + userDetails); 
  
            throw new BadCredentialsException("Invalid username and password"); 
        } 
        if(!passwordEncoder.matches(password,userDetails.getPassword())) { 
            System.out.println("Sign in userDetails - password mismatch"+userDetails); 
  
            throw new BadCredentialsException("Invalid password"); 
  
        }
        Auth response = authService.login(email);
        Map<String, String> authResponse = new HashMap<>();
        authResponse.put("tokenType", response.getTokenType());
        authResponse.put("accessToken", response.getAccessToken());
        authResponse.put("refreshToken", response.getRefreshToken());
        return ResponseEntity.status(HttpStatus.OK).body(authResponse);
	}
	
	@GetMapping("/login_success")
	public String login_success() {
		return "login_success";
	}
	
	@GetMapping("/access_denied")
	public String access_denied() {
		return "access_denied";
	}
}

