package com.tutorial.apidemo.controllers;

import java.io.IOException;
import java.security.PrivateKey;
import java.util.*;

import aj.org.objectweb.asm.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tutorial.apidemo.models.*;
import com.tutorial.apidemo.repositories.*;
import com.tutorial.apidemo.service.FirebaseFileService;
import com.tutorial.apidemo.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "api/v1/users")
// @CrossOrigin(origins = "http://127.0.0.1:5500")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ResultsRepository resultsRepository;
    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private User_animalRepository user_animalRepository;
    @Autowired
    private User_albumRepository user_albumRepository;

    private FirebaseFileService storageService;

    @GetMapping("")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> findById(@PathVariable Integer id) {
        Optional<User> foundUser = userRepository.findById(id);
        return foundUser.isPresent() ? ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Query user successfully", foundUser))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "Cannot find user with id = " + id, ""));
    }

    @PostMapping("/checkLogin")
    ResponseEntity<ResponseObject> checkLogin(@RequestBody User newUser) {
        User foundUser;
        System.out.println(newUser.getUserName() + newUser.getUserPassword());
        if (newUser.getUserName() == null) {
            foundUser = userRepository.findByUserEmailAndUserPassword(newUser.getUserEmail().trim(),
                    newUser.getUserPassword().trim());
        } else {
            foundUser = userRepository.findByUserNameAndUserPassword(newUser.getUserName().trim(),
                    newUser.getUserPassword().trim());
        }
        ;
        if (foundUser != null) {
            System.out.println(foundUser);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Login successfully", foundUser));

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "User is not exist", ""));
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertUser(@RequestBody User newUser) {
        User foundUser = userRepository.findByUserName(newUser.getUserName().trim());
        if (foundUser != null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("failed", "Username already taken", ""));
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Insert user successfully", userRepository.save(newUser)));
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> updateUser(@RequestBody User newUser,
            @PathVariable Integer id) {
        Optional<Object> updateUser = userRepository.findById(id)
                .map(user -> {
                    user.setDisplayName(newUser.getDisplayName());
                    return userRepository.save(user);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Udpate user successfully", updateUser));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponseObject> deleteUser(@PathVariable Integer id) {
        boolean exist = userRepository.existsById(id);
        if (exist) {
            userRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Delete user successfully", ""));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find user to delete", ""));
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<ResponseObject> getUserByUsername(@RequestBody String username) {
        User foundUser = userRepository.findByUserName(username);
        return foundUser != null ? ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Query user successfully", foundUser))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "Cannot find username", username));
    }

    @GetMapping("/result")
    public List<Results> getAllResults() {
        List<Results> listR = resultsRepository.findAll();
        for (Results r : listR) {
            r.setAnimalScientificName(
                    animalRepository.findByIDAnimal(r.getPredictedAnimal()).getAnimalScientificName());
        }
        return listR;
    }

    @PostMapping("/newresult")
    public ResponseEntity<ResponseObject> insertResult(@RequestBody Results newResult) {
        Animal foundAnimal = animalRepository.findByAnimalScientificName(newResult.getAnimalScientificName());
        if (foundAnimal != null) {
            newResult.setPredictedAnimal(foundAnimal.getiDAnimal());
            Date currentDate = new Date();
            Timestamp timestamp = new Timestamp(currentDate.getTime());
            newResult.setDate(timestamp);
            resultsRepository.save(newResult);
            return ResponseEntity.ok(new ResponseObject("Success", "Result inserted successfully", newResult));
        } else {
            return ResponseEntity
                    .ok(new ResponseObject("Fail", "Cannot find this animal", newResult.getAnimalScientificName()));
        }
    }

    @DeleteMapping("/deleteresult/{iDResult}")
    public ResponseEntity<ResponseObject> deleteResultByIDResult(@PathVariable Integer iDResult) {
        boolean exist = resultsRepository.existsById(Long.valueOf(iDResult));
        if (exist) {
            resultsRepository.deleteById(Long.valueOf(iDResult));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("oke", "Delete successfully", iDResult));
        }
        return null;
    }

    @PostMapping("/postAnimal")
    public ResponseEntity<ResponseObject> postAnimal(@RequestBody AnimalPost[] requestBody) {
        for (AnimalPost obj : requestBody) {
            System.out.println(obj.getFiles());
            Animal animal = animalRepository.findByAnimalScientificName(obj.getSpeciesName());
            // Lưu đối tượng User_animal vào cơ sở dữ liệu
            Integer iDUserAnimal = user_animalRepository.saveUserAnimalAndReturnID(obj.getIdUser(),
                    animal.getiDAnimal(), obj.getDateTime(), obj.getLocation(), obj.getNote());
            System.out.println(iDUserAnimal);
            if(iDUserAnimal != null) {
                for (String file : obj.getFiles()) {
                    // Tạo đối tượng User_album với iDUserAnimal và imageLink
                    User_album userAlbum = new User_album();
                    userAlbum.setiDUserAnimal(iDUserAnimal);
                    userAlbum.setImageLink(file);
                    user_albumRepository.save(userAlbum);
                }
            }
        }
        return ResponseEntity
                .ok(new ResponseObject("Success", "Received, processed, saved, and linked animal objects", requestBody));
    }
}
