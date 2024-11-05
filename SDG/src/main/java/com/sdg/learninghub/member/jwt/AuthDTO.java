package com.sdg.learninghub.member.jwt;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDTO {
	
	@JsonProperty("accessToken")
	private String accessToken;
}
