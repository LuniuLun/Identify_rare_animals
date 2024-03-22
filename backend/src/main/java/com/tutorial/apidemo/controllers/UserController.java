package com.tutorial.apidemo.controllers;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tutorial.apidemo.models.User;
import com.tutorial.apidemo.repositories.UserRepository;
import com.tutorial.apidemo.models.ResponseObject;
import com.tutorial.apidemo.models.TemporaryUser;

@RestController
@RequestMapping(path = "api/v1/users")
//@CrossOrigin(origins = "http://127.0.0.1:5500")
@CrossOrigin(origins = "http://127.0.0.1:5173")
public class UserController {
    @Autowired
    private UserRepository repository;

    @GetMapping("")
    List<User> getAllUsers() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> findById(@PathVariable Long id) {
        Optional<User> foundUser = repository.findById(id);
        return foundUser.isPresent() ? ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Query user successfully", foundUser))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("failed", "Cannot find user with id = " + id, ""));
    }

    @PostMapping("/checkLogin")
    ResponseEntity<ResponseObject> checkLogin(@RequestBody TemporaryUser newUser) {
        List<User> foundUser;
        System.out.println(newUser.getUserName() + newUser.getUserPassword());
        if(newUser.getUserName() == null) {
            foundUser = repository.findByUserEmailAndUserPassword(newUser.getUserEmail().trim(),
                    newUser.getUserPassword().trim());
        }else {
            foundUser = repository.findByUserNameAndUserPassword(newUser.getUserName().trim(),
                    newUser.getUserPassword().trim());
        }
;
        if (!foundUser.isEmpty()) {
            System.out.println(foundUser);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Login successfully", foundUser));

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "User is not exist", ""));
    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertUser(@RequestBody User newUser) {
        List<User> foundUser = repository.findByUserName(newUser.getUserName().trim());
        if (!foundUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("failed", "Username already taken", ""));
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Insert user successfully", repository.save(newUser)));
    }

    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> updateUser(@RequestBody TemporaryUser newUser,
            @PathVariable Long id) {
        Optional<Object> updateUser = repository.findById(id)
                .map(user -> {
                    user.setName(newUser.getName());
                    user.setCountry(newUser.getCountry());
                    user.setStory(newUser.getStory());
                    return repository.save(user);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Udpate user successfully", updateUser));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<ResponseObject> deleteUser(@PathVariable Long id) {
        boolean exist = repository.existsById(id);
        if (exist) {
            repository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Delete user successfully", ""));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Cannot find user to delete", ""));
    }
}
