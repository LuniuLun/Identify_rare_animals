package com.tutorial.apidemo.controllers;

import com.tutorial.apidemo.models.*;
import com.tutorial.apidemo.repositories.AnimalRepository;
import com.tutorial.apidemo.repositories.Animal_albumRepository;
import com.tutorial.apidemo.repositories.Detail_animalRepository;
import com.tutorial.apidemo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/animals")
@CrossOrigin(origins = "http://localhost:3000")
public class AnimalController {

    @Autowired
    private AnimalRepository repository;
    @Autowired
    private Detail_animalRepository detail_animalRepository;
    @Autowired
    private Animal_albumRepository animal_albumRepository;

    @GetMapping("")
    public List<Animal> getAllAnimals() {
        List<Animal> foundedAnimal = repository.findAll();
        for(Animal animal: foundedAnimal) {
            List<Animal_album> animalAlbum = animal_albumRepository.findByiDAnimal(animal.getiDAnimal());
            if(!animalAlbum.isEmpty()) {
                animal.setAnimalAva(animalAlbum.get(0).getImageLink());
            }
        }
        return repository.findAll();
    }

    @GetMapping("/{animalScientificName}")
    public ResponseEntity<ResponseObject> findById(@PathVariable String animalScientificName) {
        Animal foundedAnimal = repository.findByAnimalScientificName(animalScientificName);
        return foundedAnimal != null
                ? ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Query user successfully", foundedAnimal))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Cannot find user with AnimalScientificName = " + animalScientificName, ""));
    }
    @GetMapping("/details")
    public List<Detail_animal> getAllDetailAnimals() { return detail_animalRepository.findAll(); }
    @GetMapping("/details/{iDDetail}")
    public Detail_animal getDetailAnimalByiDDetail(@PathVariable Integer iDDetail) {
        Detail_animal foundDetail = detail_animalRepository.findByIDDetail(iDDetail);
        return foundDetail;
    }
    @GetMapping("/detailbyidanimal/{IDAnimal}")
    public Detail_animal getDetailAnimalByIDAnimal(@PathVariable Integer IDAnimal) {
        Animal foundAnimal = repository.findByIDAnimal(IDAnimal);
        Detail_animal foundDetail = null;
        if (foundAnimal != null) {
            foundDetail = detail_animalRepository.findByIDDetail(foundAnimal.getiDDetail());
        }
        return foundDetail;
    }
    @GetMapping("/detailbyanimalscientificname/{animalScientificName}")
    public Detail_animal getDetailAnimalByAnimalScientificName(@PathVariable String animalScientificName) {
        Animal foundAnimal = repository.findByAnimalScientificName(animalScientificName);
        Detail_animal foundDetail = null;
        foundDetail = detail_animalRepository.findByIDDetail(foundAnimal.getiDDetail());
        return foundDetail;
    }
    @PutMapping("/editdetail/{IDAnimal}")
    public ResponseEntity<ResponseObject> editDetailAnimal(@RequestBody Detail_animal newDetail, @PathVariable Integer IDAnimal) {
        Detail_animal updateDetail = getDetailAnimalByIDAnimal(IDAnimal);
        if(updateDetail != null) {
            updateDetail.setAppearance(newDetail.getAppearance());
            updateDetail.setHabits(newDetail.getHabits());
            updateDetail.setContinents(newDetail.getContinents());
            updateDetail.setCountries(newDetail.getCountries());
            updateDetail.setWwfBiomes(newDetail.getWwfBiomes());
            updateDetail.setLevelOfDanger(newDetail.getLevelOfDanger());
            updateDetail.setTheRemainAmount(newDetail.getTheRemainAmount());
            updateDetail.setStatus(newDetail.getStatus());
            detail_animalRepository.save(updateDetail);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Update ok", updateDetail)
            );
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("fail", "Cannot edit this", newDetail)
            );
        }
    }
    @GetMapping("/album/{iDAnimal}")
    public List<Animal_album> getAlbumByIDAnimal(@PathVariable Integer iDAnimal) {
        List<Animal_album> foundAlbum = animal_albumRepository.findByiDAnimal(iDAnimal);
        return foundAlbum;
    }
    @GetMapping("/search/{search}")
    public List<Animal> searchAnimal(@PathVariable String search) {
        List<Animal> foundAnimal = repository.findByKeywordIgnoreCase(search.toLowerCase());
        for(Animal animal: foundAnimal) {
            List<Animal_album> animalAlbum = animal_albumRepository.findByiDAnimal(animal.getiDAnimal());
            if(!animalAlbum.isEmpty()) {
                animal.setAnimalAva(animalAlbum.get(0).getImageLink());
            }
        }
        return foundAnimal;
    }

}
