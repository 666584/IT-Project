package com.sdg.learninghub.member;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sdg.learninghub.member.jwt.Auth;
import com.sdg.learninghub.member.jwt.AuthDTO;
import com.sdg.learninghub.member.jwt.AuthService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class MemberController {
	
	private final MemberService memberService;
	private final MemberSecurityService memberSecurityService;
	private final GoogleService googleService;
	private final PasswordEncoder passwordEncoder;
	private final AuthService authService;
	
	@GetMapping("/signup")
	public String signup(UserCreateForm userCreateForm) {
		return "signup_form";
	}
	
	@PostMapping("/signup")
	public String signup(@Valid @RequestBody UserCreateForm userCreateForm, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			for (FieldError error : bindingResult.getFieldErrors()) {
                System.out.println(error.getField() + ": " + error.getDefaultMessage());
            }
			return "Error";
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

        try {        	
            UserDetails userDetails = memberSecurityService.loadUserByUsername(email);        
            if(!passwordEncoder.matches(password,userDetails.getPassword())) { 
                System.out.println("Sign in userDetails - password mismatch"+userDetails);      
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("The email or password is incorrect.");               
            }
        } catch (UsernameNotFoundException e) {
            if (e.getMessage().equals("USER_NOT_FOUND")) {
                System.out.println("The email or password is incorrect.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("The email or password is incorrect.");
            } else {
                System.out.println("An unexpected error occurred: " + e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("An unexpected error occurred: " + e.getMessage());
            }
        }
        
        Auth response = authService.login(email);
        Map<String, String> authResponse = new HashMap<>();
        authResponse.put("tokenType", response.getTokenType());
        authResponse.put("accessToken", response.getAccessToken());
        authResponse.put("refreshToken", response.getRefreshToken());
        return ResponseEntity.status(HttpStatus.OK).body(authResponse);
	}
	
	@PostMapping("/googleLogin")
	public ResponseEntity<?> googleLogin(@RequestBody AuthDTO authDTO) {
		String accessToken = authDTO.getAccessToken();
		String email = googleService.getGoogleUser(accessToken);
		if (email == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred");
		}
		System.out.println("googleLogin: " + email);
		Auth response = authService.login(email);
        Map<String, String> authResponse = new HashMap<>();
        authResponse.put("tokenType", response.getTokenType());
        authResponse.put("accessToken", response.getAccessToken());
        authResponse.put("refreshToken", response.getRefreshToken());
		
        return ResponseEntity.status(HttpStatus.OK).body(authResponse);
	}
	
	@GetMapping("/access_denied")
	public String access_denied() {
		return "access_denied";
	}
	
	@GetMapping("/user/{userId}")
	public UserDTO UserData(@PathVariable Long userId) {
		MemberEntity member = memberService.getMember(userId);
		if(member == null) {
			return null;
		}
		UserDTO user = new UserDTO();
		user.setUsername(member.getUsername());
		user.setEmail(member.getEmail());
		user.setFirstname(member.getFirstname());
		user.setLastname(member.getLastname());
		return user;
	}
	
	@PostMapping("/user/update")
	public ResponseEntity<String> updateUser(@RequestBody UserDTO userDTO) {
		System.out.println(userDTO.getFirstname());
		memberService.updateMember(userDTO);
		return ResponseEntity.status(HttpStatus.OK).body("User Updated.");
	}
}

