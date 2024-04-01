package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.User_album;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD

import java.util.List;

public interface User_albumRepository extends JpaRepository<User_album, Long> {
    List<User_album> findByiDUserAnimal(Integer iDUserAnimal);
=======
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface User_albumRepository extends JpaRepository<User_album, Long> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO user_album (IDUserAnimal, ImageLink) VALUES (?1, ?2)", nativeQuery = true)
    void saveUser_album(Integer iDUserAnimal, String imageLink);
>>>>>>> main
}
