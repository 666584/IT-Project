package com.sdg.learninghub.member.jwt;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberRole;
import com.sdg.learninghub.member.MemberSecurityService;
import com.sdg.learninghub.member.Provider;
import com.sdg.learninghub.member.SecurityMemberDetailsDTO;
import com.sdg.learninghub.member.UserDTO;
import com.sdg.learninghub.member.mapper.MemberMapper;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	@Autowired
	private MemberMapper memberMapper;
    
    private final AuthRepository authRepository;
    private final JwtTokenProvider jwtTokenProvider;
    
    @Transactional
    public Auth login(String email) {
    	Optional<MemberEntity> users = memberMapper.findByEmail(email);
    	MemberEntity user = null;
    	if (users.isPresent()) {
    		user = users.get();
        	System.out.println("getId"+user.getUserid());
        	System.out.println("username"+user.getUsername());
        	System.out.println("getFirstName"+user.getFirstname());
        	System.out.println("getLastName"+user.getLastname());
        }
    	String accessToken = this.jwtTokenProvider.generateAccessToken(
                new UsernamePasswordAuthenticationToken(new SecurityMemberDetailsDTO(user), user.getPassword()));
    	String refreshToken = this.jwtTokenProvider.generateRefreshToken(
                new UsernamePasswordAuthenticationToken(new SecurityMemberDetailsDTO(user), user.getPassword()));
    	System.out.println("got accessToken"+accessToken);
    	
    	if (this.authRepository.existsByUser(user)) {
        	System.out.println("user already exists.");
        	Auth auth = authRepository.findByUser(user);
        	auth.updateAccessToken(accessToken);
        	auth.updateRefreshToken(refreshToken);
        	authRepository.save(auth);
            return auth;
        }
        Auth auth = create(user, "Bearer", accessToken, refreshToken);
        return auth;
    }

    @Transactional
    public String refreshToken(String refreshToken) {
        if (this.jwtTokenProvider.validateToken(refreshToken)) {
            Optional<Auth> auth = this.authRepository.findByRefreshToken(refreshToken);
            if(auth.isEmpty()){ 
            	throw new IllegalArgumentException("Cannot find token.\nREFRESH_TOKEN = " + refreshToken);
            }
            Auth accessAuth = auth.get();
            String newAccessToken = this.jwtTokenProvider.generateAccessToken(
                    new UsernamePasswordAuthenticationToken(
                            new SecurityMemberDetailsDTO(accessAuth.getUser()), accessAuth.getUser().getPassword()));
            accessAuth.updateAccessToken(newAccessToken);
            return newAccessToken;
        }
       return null;
    }
    
    @Transactional
    public Auth create(MemberEntity user, String tokenType, String accessToken, String refreshToken) {
    	Auth auth = new Auth();
    	auth.setUser(user);
    	auth.setTokenType(tokenType);
    	auth.setAccessToken(accessToken);
    	auth.setRefreshToken(refreshToken);
    	System.out.println("create"+auth.getUser().getEmail());
    	this.authRepository.save(auth);
		return auth;
    }
    
    public MemberEntity getUser(String accessToken) {
    	if (this.jwtTokenProvider.validateToken(accessToken)) {
            Optional<Auth> auth = this.authRepository.findByAccessToken(accessToken);
            if(auth.isEmpty()){ 
            	throw new IllegalArgumentException("Cannot find token.\nREFRESH_TOKEN = " + accessToken);
            }
            Auth accessAuth = auth.get();
            return accessAuth.getUser();
    	}
    	return null;
    };
    
}
