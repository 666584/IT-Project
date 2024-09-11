package com.sdg.learninghub.member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	@Column(name="user_id")
	private Long id;
	
	@Column(unique = true, length = 45)
	private String username;
	
	@Column
	private String password;
	
	@Column(unique = true, nullable = false, length = 50)
	private String email;
	
	@Column(nullable = false, length = 45)
	private String firstName;
	
	@Column(nullable = false, length = 45)
	private String lastName;
	
	@Enumerated(EnumType.STRING)
	private MemberRole role;
	
	@Enumerated(EnumType.STRING)
	private Provider provider;
	
	public MemberEntity update(Provider provider) {
		if(this.provider == null) {
			this.provider = provider;
		}
		return this;
	}
}