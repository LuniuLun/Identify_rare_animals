package com.tutorial.apidemo.controllers;

import java.util.List;
import java.util.Optional;

import com.tutorial.apidemo.models.*;
import com.tutorial.apidemo.repositories.*;
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
@RequestMapping(path = "api/v1/users")
//@CrossOrigin(origins = "http://127.0.0.1:5500")
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
        if(newUser.getUserName() == null) {
            foundUser = userRepository.findByUserEmailAndUserPassword(newUser.getUserEmail().trim(),
                    newUser.getUserPassword().trim());
        }else {
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


    @GetMapping("/{username}")
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
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("fail", "This id does not exist", iDResult)
        );
    }
    @GetMapping("/animal")
    public List<User_animal> getAllUser_animal() {
        List<User_animal> found = user_animalRepository.findAll();
        for (User_animal userAnimal : found) {
            Animal animal = animalRepository.findByIDAnimal(userAnimal.getiDAnimal());
            if(animal != null) {
                userAnimal.setAnimal(animal);
                List<User_album> foundAlbum = user_albumRepository.findByiDUserAnimal(userAnimal.getiDUserAnimal());
                if (!foundAlbum.isEmpty()) {
                    userAnimal.getAnimal().setAnimalAva(foundAlbum.get(0).getImageLink());
                }
            }
        }
        return found;
    }
    @GetMapping("/album")
    public ResponseEntity<ResponseObject> getAllUserAlbum() {
        List<User_album> found = user_albumRepository.findAll();
        return found != null
                ? ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Query user successfully", found))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find", ""));
    }
    @GetMapping("/animal/{iDUser}")
    public List<User_animal> getAllUser_animalByiDUser(@PathVariable Integer iDUser) {
        List<User_animal> found = user_animalRepository.findByiDUser(iDUser);
        for (User_animal userAnimal : found) {
            Animal animal = animalRepository.findByIDAnimal(userAnimal.getiDAnimal());
            if(animal != null) {
                userAnimal.setAnimal(animal);
                List<User_album> foundAlbum = user_albumRepository.findByiDUserAnimal(userAnimal.getiDUserAnimal());
                if (!foundAlbum.isEmpty()) {
                    userAnimal.getAnimal().setAnimalAva(foundAlbum.get(0).getImageLink());
                }
            }
        }
        return found;
    }
}
