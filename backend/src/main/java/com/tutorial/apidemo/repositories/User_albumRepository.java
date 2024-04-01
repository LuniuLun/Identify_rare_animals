package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.User_album;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface User_albumRepository extends JpaRepository<User_album, Long> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO user_album (IDUserAnimal, ImageLink) VALUES (?1, ?2)", nativeQuery = true)
    void saveUser_album(Integer iDUserAnimal, String imageLink);

    List<User_album> findByiDUserAnimal(Integer iDUserAnimal);
}
