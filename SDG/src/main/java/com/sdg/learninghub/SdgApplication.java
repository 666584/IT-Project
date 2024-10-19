package com.sdg.learninghub;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.sdg.learninghub.member.mapper") 
public class SdgApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(SdgApplication.class, args);
	}

}
