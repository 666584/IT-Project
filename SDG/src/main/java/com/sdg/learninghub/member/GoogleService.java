package com.sdg.learninghub.member;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class GoogleService {
	
	private final MemberService memberService;
	
	public String getGoogleUser(String accessToken) {
		String url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;

	    RestTemplate restTemplate = new RestTemplate();
	    try {
	        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);
	        Map<String, Object> userInfo = response.getBody();
	        if (userInfo != null) {
	        	String email = userInfo.get("email").toString();
	        	String firstName = userInfo.get("given_name").toString();
	        	String lastName = userInfo.get("family_name").toString();
	        	MemberEntity existingUser = memberService.getMemberByEmail(email);
	            if(existingUser == null) {
	            	MemberEntity newUser = memberService.createFromGoogle(email, firstName, lastName);
	            	return newUser.getEmail();
	            }
	            return existingUser.getEmail();
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return null;
	}
}
