package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    Animal findByAnimalScientificName(String animalScientificName);
    @Query("SELECT a FROM Animal a WHERE a.iDAnimal = :iDAnimal")
    Animal findByIDAnimal(Integer iDAnimal);
    @Query(value = "SELECT a FROM Animal a WHERE " +
            "LOWER(CONCAT(a.animalName, ' ', a.animalScientificName)) " +
            "LIKE %:keyword%")
    List<Animal> findByKeywordIgnoreCase(@Param("keyword") String keyword);

}
