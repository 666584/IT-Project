package com.sdg.learninghub;

import com.sdg.learninghub.member.CustomOAuth2UserService;
import com.sdg.learninghub.member.MemberRepository;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	//private final MemberSecurityService memberSecurityService;
	private final CustomOAuth2UserService customOAuth2UserService;
	
	public SecurityConfig(CustomOAuth2UserService customOAuth2UserService) {
		 this.customOAuth2UserService = customOAuth2UserService;
	}
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
					.requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
					.anyRequest().authenticated()
		);
		http
			.formLogin((auth) -> auth
					.loginPage("/user/login")
					.defaultSuccessUrl("/user/login_success")
					.failureUrl("/user/access_denied")
					.usernameParameter("email") 
					.permitAll()
		);
		http
	    .oauth2Login(oauth2 -> oauth2
	        .defaultSuccessUrl("/user/login_success", true)
	        .failureUrl("/user/access_denied")
	        .permitAll()
	        .userInfoEndpoint(userInfo -> userInfo
	            .userService(customOAuth2UserService)
	        )
	    );
		http
			.logout((logout) -> logout
					.logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
					.logoutSuccessUrl("/user/login")
					.invalidateHttpSession(true)
					.deleteCookies("JSESSIONID")
		);
			
		return http.build();
	} 
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
