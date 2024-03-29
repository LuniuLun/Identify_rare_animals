package com.tutorial.apidemo.controllers;

import com.tutorial.apidemo.models.Animal;
import com.tutorial.apidemo.models.ResponseObject;
import com.tutorial.apidemo.repositories.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/animals")
public class AnimalController {

    @Autowired
    private AnimalRepository repository;

    @GetMapping("")
    public List<Animal> getAllAnimals() {
        return repository.findAll();
    }

    @GetMapping("/{animalScientificName}")
    public ResponseEntity<ResponseObject> findById(@PathVariable String animalScientificName) {
        List<Animal> foundedAnimal = repository.findByAnimalScientificName(animalScientificName);
        return !foundedAnimal.isEmpty() ? ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Query user successfully", foundedAnimal))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find user with AnimalScientificName = " + animalScientificName, ""));
    }
}
