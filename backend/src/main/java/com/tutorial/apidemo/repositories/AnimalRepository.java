package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    Animal findByAnimalScientificName(String animalScientificName);
    @Query("SELECT a FROM Animal a WHERE a.iDAnimal = :iDAnimal")
    Animal findByIDAnimal(Integer iDAnimal);


}
