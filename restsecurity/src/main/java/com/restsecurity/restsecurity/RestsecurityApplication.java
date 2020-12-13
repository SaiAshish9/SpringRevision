package com.restsecurity.restsecurity;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.restsecurity.restsecurity.entity.User;
import com.restsecurity.restsecurity.repository.UserRepository;

@SpringBootApplication
public class RestsecurityApplication {

    @Autowired
    private UserRepository repository;

    @PostConstruct
    public void initUsers() {
    	
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    	String encode=encoder.encode("1234");
    	System.out.println(encode);
    	
        List<User> users = Stream.of(
                new User(101, "sai", "$2a$10$AlIAJb6YtuRp2PPs79plduJEJ7XeuqGVL6YmggQ3KS0WrKJhceP1.", "sai9@gmail.com"),
                new User(102, "sai9", "1234", "sai9@gmail.com")
        ).collect(Collectors.toList());
        repository.saveAll(users);
    }

	public static void main(String[] args) {
		SpringApplication.run(RestsecurityApplication.class, args);
	}

}
