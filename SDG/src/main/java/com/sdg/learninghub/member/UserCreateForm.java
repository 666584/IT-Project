package com.sdg.learninghub.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserCreateForm {
	@Size(min = 2, max = 45)
	@NotEmpty(message = "Enter first name.")
	private String firstName;
	
	@Size(min = 2, max = 45)
	@NotEmpty(message = "Enter last name.")
	private String lastName;
	
	@Size(min = 2, max = 45)
	@NotEmpty(message = "Enter username.")
	private String username;
	
	@Size(min = 2, max = 100)
	@NotEmpty(message = "Enter an email address.")
	@Email
	private String email;
	
	@Size(max = 40)
	@NotEmpty(message = "Enter a password.")
	private String password1;
	
	@NotEmpty(message = "Confirm your password")
	private String password2;
}
