package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.User_animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface User_animalRepository  extends JpaRepository<User_animal, Long> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO user_animal (IDUser, IDAnimal, Date, Location, Note) VALUES (?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
    Integer saveUserAnimalAndReturnID(Integer idUser, Integer iDAnimal, Date date, String location, String note);
}
