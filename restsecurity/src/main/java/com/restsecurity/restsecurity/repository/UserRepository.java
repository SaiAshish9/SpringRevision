package com.restsecurity.restsecurity.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.restsecurity.restsecurity.entity.User;

public interface UserRepository extends JpaRepository<User,Integer>{

	User findByUsername(String username);


	
}
