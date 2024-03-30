package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByiDUser(Integer iDUser);
    User findByusername(String username);
}
