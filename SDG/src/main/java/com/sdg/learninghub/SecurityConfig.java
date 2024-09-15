package com.sdg.learninghub;

import com.sdg.learninghub.member.CustomOAuth2UserService;
import com.sdg.learninghub.member.MemberRepository;
import com.sdg.learninghub.member.jwt.JwtTokenFilter;
import com.sdg.learninghub.member.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.HttpSecurityDsl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer{
	//private final MemberSecurityService memberSecurityService;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final JwtTokenFilter jwtTokenFilter;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {		
		CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setAllowedOrigins(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT","OPTIONS","PATCH", "DELETE"));
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setExposedHeaders(List.of("Authorization"));
        http.csrf(csrf -> csrf.disable());
        http.sessionManagement(sessionManagementConfigurer -> sessionManagementConfigurer
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http
	        .cors(Customizer.withDefaults());
        http
			.authorizeHttpRequests((authorizeHttpRequests) -> authorizeHttpRequests
					.requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
					.anyRequest().authenticated()
		);
		/**http
			.formLogin((auth) -> auth
					.loginPage("/user/login")
					.defaultSuccessUrl("/user/login_success")
					.failureUrl("/user/access_denied")
					.usernameParameter("email") 
					.permitAll()
		);*/
		http
	    .oauth2Login(oauth2 -> oauth2
	        .defaultSuccessUrl("/user/login_success", true)
	        .failureUrl("/user/access_denied")
	        .permitAll()
	        .userInfoEndpoint(userInfo -> userInfo
	            .userService(customOAuth2UserService)
	        )
	    );
		/**http
			.logout((logout) -> logout
					.logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
					.logoutSuccessUrl("/user/login")
					.invalidateHttpSession(true)
					.deleteCookies("JSESSIONID")
		);*/
		http.addFilterBefore(this.jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	} 
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://localhost:3001") // React 개발 서버의 주소
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
