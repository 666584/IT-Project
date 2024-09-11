package com.sdg.learninghub.member;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private Provider provider = Provider.GOOGLE;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String firstName, String lastName, String email){
		this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes){
        return OAuthAttributes.builder()
                .firstName((String) attributes.get("given_name"))
                .lastName((String) attributes.get("family_name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public MemberEntity toEntity(){
    	MemberEntity memberEntity = new MemberEntity();
		memberEntity.setUsername(username);
		memberEntity.setEmail(email);
		memberEntity.setFirstName(firstName);
		memberEntity.setLastName(lastName);
		memberEntity.setRole(MemberRole.USER);
		memberEntity.setProvider(provider);
    	return memberEntity;
    }
}
