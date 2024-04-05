package com.tutorial.apidemo.repositories;

import java.util.List;

import com.tutorial.apidemo.models.Detail_animal;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tutorial.apidemo.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository
        extends JpaRepository<User, Integer> {
    User findByUserName(String userName);
    @Query("SELECT d FROM User d WHERE d.userEmail = :userEmail")
    User findByEmail(@Param("userEmail") String userEmail);
    User findByUserNameAndUserPassword(String userName, String userPassword);
    User findByUserEmailAndUserPassword(String userEmail, String UserPassword);

    User findByiDUser(Integer iDUser);

} 
