package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.Animal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {
    List<Animal> findByAnimalScientificName(String animalScientificName);
}
