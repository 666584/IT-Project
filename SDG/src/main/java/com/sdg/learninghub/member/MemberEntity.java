package com.sdg.learninghub.member;

import com.sdg.learninghub.member.jwt.Auth;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "users")
public class MemberEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userid;
	
	@Column(unique = true, length = 45)
	private String username;
	
	@Column
	private String password;
	
	@Column(unique = true, length = 50)
	private String email;
	
	@Column(length = 45)
	private String firstname;
	
	@Column(length = 45)
	private String lastname;
	
	@Enumerated(EnumType.STRING)
	private MemberRole role;
	
	@Enumerated(EnumType.STRING)
	private Provider provider;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.PERSIST )
    private Auth auth;
	
	public MemberEntity update(Provider provider) {
		if(this.provider == null) {
			this.provider = provider;
		}
		return this;
	}
}