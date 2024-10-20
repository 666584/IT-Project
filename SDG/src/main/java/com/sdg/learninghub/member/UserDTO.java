package com.sdg.learninghub.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	
	String username;
	String email;
	String firstName;
	String lastName;

	public UserDTO (String username, String email, 
			String firstName, String lastName){
		this.username = username;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
