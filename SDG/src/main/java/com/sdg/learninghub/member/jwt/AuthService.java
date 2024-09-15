package com.sdg.learninghub.member.jwt;

import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.MemberRepository;
import com.sdg.learninghub.member.MemberRole;
import com.sdg.learninghub.member.MemberSecurityService;
import com.sdg.learninghub.member.Provider;
import com.sdg.learninghub.member.SecurityMemberDetailsDTO;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final AuthRepository authRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public Auth login(String email) {
    	Optional <MemberEntity> memberEntity = this.memberRepository.findByEmail(email);
    	MemberEntity user = memberEntity.get();
    	String accessToken = this.jwtTokenProvider.generateAccessToken(
                new UsernamePasswordAuthenticationToken(new SecurityMemberDetailsDTO(user), user.getPassword()));
    	String refreshToken = this.jwtTokenProvider.generateRefreshToken(
                new UsernamePasswordAuthenticationToken(new SecurityMemberDetailsDTO(user), user.getPassword()));
    	
    	if (this.authRepository.existsByUser(user)) {
        	System.out.println("user already exists.");
    		user.getAuth().updateAccessToken(accessToken);
        	user.getAuth().updateRefreshToken(refreshToken);
            return user.getAuth();
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
    	this.authRepository.save(auth);
		return auth;
    }
}
