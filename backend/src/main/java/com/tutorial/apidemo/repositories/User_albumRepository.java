package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.User_album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface User_albumRepository extends JpaRepository<User_album, Long> {
    List<User_album> findByiDUserAnimal(Integer iDUserAnimal);
}
