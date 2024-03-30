package com.tutorial.apidemo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tutorial.apidemo.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository
        extends JpaRepository<User, Integer> {
    User findByUserName(String userName);
    User findByUserNameAndUserPassword(String userName, String userPassword);
    User findByUserEmailAndUserPassword(String userEmail, String UserPassword);

    User findByiDUser(Integer iDUser);

} 
