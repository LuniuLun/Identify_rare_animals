package com.tutorial.apidemo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tutorial.apidemo.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUserName(String userName);
    List<User> findByUserNameAndUserPassword(String userName, String userPassword);
    List<User> findByUserEmailAndUserPassword(String userEmail, String UserPassword);
} 
