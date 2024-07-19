package com.web.ndolphin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication()
public class NdolphinApplication {

	public static void main(String[] args) {

		SpringApplication.run(NdolphinApplication.class, args);
	}

}