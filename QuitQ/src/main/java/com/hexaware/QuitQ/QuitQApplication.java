package com.hexaware.QuitQ;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class QuitQApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuitQApplication.class, args);
	}

}
