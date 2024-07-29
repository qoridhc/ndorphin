package com.web.ndolphin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication()
@EnableJpaAuditing
public class NdolphinApplication {

    public static void main(String[] args) {

        SpringApplication.run(NdolphinApplication.class, args);
    }

}