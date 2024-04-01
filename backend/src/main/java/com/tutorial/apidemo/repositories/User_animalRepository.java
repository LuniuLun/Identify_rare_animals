package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.User_animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface User_animalRepository extends JpaRepository<User_animal, Long> {
    List<User_animal> findByiDUser(Integer iDUser);

}
