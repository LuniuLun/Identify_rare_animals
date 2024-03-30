package com.tutorial.apidemo.controllers;

import com.tutorial.apidemo.models.Animal;
import com.tutorial.apidemo.models.ResponseObject;
import com.tutorial.apidemo.models.Results;
import com.tutorial.apidemo.models.User;
import com.tutorial.apidemo.repositories.AnimalRepository;
import com.tutorial.apidemo.repositories.ResultsRepository;
import com.tutorial.apidemo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private ResultsRepository resultsRepository;
        @Autowired
        private AnimalRepository animalRepository;
        @GetMapping("/user")
        public List<User> getAllUser() {
            return userRepository.findAll();
        }
        @GetMapping("/user/{username}")
        public ResponseEntity<ResponseObject> getUserByUsername(@RequestBody String username) {
            User foundUser = userRepository.findByusername(username);
            return foundUser != null ? ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Query user successfully", foundUser))
                    : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Cannot find username", username));
        }
        @GetMapping("/result")
        public List<Results> getAllResults() {
            List<Results> listR = resultsRepository.findAll();
            for(Results r : listR) {
                r.setAnimalScientificName(animalRepository.findByIDAnimal(r.getPredictedAnimal()).getAnimalScientificName());
            }
            return listR;
        }

        @PostMapping("/newresult")
        public ResponseEntity<ResponseObject> insertResult(@RequestBody Results newResult) {
            Animal foundAnimal = animalRepository.findByAnimalScientificName(newResult.getAnimalScientificName());
            if(foundAnimal != null) {
                newResult.setPredictedAnimal(foundAnimal.getiDAnimal());
                Date currentDate = new Date();
                Timestamp timestamp = new Timestamp(currentDate.getTime());
                newResult.setDate(timestamp);
                resultsRepository.save(newResult);
                return ResponseEntity.ok(new ResponseObject("Success", "Result inserted successfully", newResult));
            } else {
                return ResponseEntity.ok(new ResponseObject("Fail", "Cannot find this animal", newResult.getAnimalScientificName()));
            }
        }
        @DeleteMapping("/deleteresult/{iDResult}")
        public ResponseEntity<ResponseObject> deleteResultByIDResult(@PathVariable Integer iDResult) {
            boolean exist = resultsRepository.existsById(Long.valueOf(iDResult));
            if(exist) {
                resultsRepository.deleteById(Long.valueOf(iDResult));
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("oke", "Delete successfully", iDResult)
                );
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("fail", "No exist", iDResult)
            );
        }

}
