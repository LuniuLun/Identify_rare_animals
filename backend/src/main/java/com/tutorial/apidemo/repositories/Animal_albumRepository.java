package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.Animal_album;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Animal_albumRepository extends JpaRepository<Animal_album, Long> {
    List<Animal_album> findByiDAnimal(Integer iDAnimal);
}
