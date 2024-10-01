package com.sdg.learninghub.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2UserService oAuth2UserService = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = oAuth2UserService.loadUser(oAuth2UserRequest);
        
        String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId(); 
        String userNameAttributeName = oAuth2UserRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
            
        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        
        MemberEntity member = saveOrUpdate(attributes);
        httpSession.setAttribute("user", member); 
        System.out.println(attributes.getAttributes());
        return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))
                , attributes.getAttributes()
                , attributes.getNameAttributeKey());
    }

    private MemberEntity saveOrUpdate(OAuthAttributes attributes) {
    	Optional<MemberEntity> user = this.memberRepository.findByEmail(attributes.getEmail());
		if(user.isPresent()) {
			MemberEntity member = user.get();
			member.update(Provider.GOOGLE);
			return memberRepository.save(member);
		}
        return memberRepository.save(attributes.toEntity());
    }
}