package com.tutorial.apidemo.controllers;

import java.io.IOException;
import java.security.PrivateKey;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.text.SimpleDateFormat;
import aj.org.objectweb.asm.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tutorial.apidemo.models.*;
import com.tutorial.apidemo.repositories.*;
import com.tutorial.apidemo.service.FirebaseFileService;
import com.tutorial.apidemo.service.IStorageService;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Random;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Properties;

import com.tutorial.apidemo.models.User;
import com.tutorial.apidemo.models.User_album;
import com.tutorial.apidemo.models.User_animal;
import com.tutorial.apidemo.repositories.AnimalRepository;
import com.tutorial.apidemo.repositories.ResultsRepository;
import com.tutorial.apidemo.repositories.UserRepository;
import com.tutorial.apidemo.repositories.User_albumRepository;
import com.tutorial.apidemo.repositories.User_animalRepository;
import com.tutorial.apidemo.models.Animal;
import com.tutorial.apidemo.models.AnimalPost;
import com.tutorial.apidemo.models.ResponseObject;
import com.tutorial.apidemo.models.Results;

@RestController
@RequestMapping(path = "api/v1/users")
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

    private int otp;
    private LocalDateTime otpTime;

    @GetMapping("")
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{iDUser}")
    ResponseEntity<ResponseObject> findById(@PathVariable Integer iDUser) {
        User foundUser = userRepository.findByiDUser(iDUser);
        if (foundUser != null) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("ok", "Query user successfully", foundUser));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseObject("failed", "Cannot find user with id = " + iDUser, ""));
        }
    }



    @PostMapping("/checkLogin")
    ResponseEntity<ResponseObject> checkLogin(@RequestBody User newUser) {
        User foundByUserName, foundByEmail;
        foundByUserName = userRepository.findByUserName(newUser.getUserName().trim());
        foundByEmail = userRepository.findByEmail(newUser.getUserEmail().trim());
        System.out.println(foundByUserName);
        System.out.println(foundByEmail);
        if(foundByUserName != null) {
            if(BCrypt.checkpw(newUser.getUserPassword(), foundByUserName.getUserPassword())) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Login successfully", foundByUserName));
            }
        }
        else if(foundByEmail != null){
            if(BCrypt.checkpw(newUser.getUserPassword(), foundByEmail.getUserPassword())) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Login successfully", foundByEmail));
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "User is not exist", ""));
    }

//    @PostMapping("/insert")
//    ResponseEntity<ResponseObject> insertUser(@RequestBody User newUser) {
//        User foundUser = userRepository.findByUserName(newUser.getUserName().trim());
//        if (foundUser != null) {
//            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
//                    new ResponseObject("failed", "Username already taken", ""));
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject("ok", "Insert user successfully", userRepository.save(newUser)));
//    }

    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertUser(@RequestBody User newUser) {
        User foundUser = userRepository.findByUserName(newUser.getUserName().trim());
        if (foundUser != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    new ResponseObject("failed", "Username already taken", ""));
        }
        System.out.println(newUser.getUserName() + " " + newUser.getUserEmail() + " " + newUser.getUserPassword());
        User savedUser = userRepository.save(newUser);
        if (savedUser != null) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Insert user successfully", savedUser));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("failed", "Failed to insert user", ""));
        }
    }

    public boolean sendOTP(String email) {
        System.out.println(email);
        final String username = "raniland1404@gmail.com";
        final String password = "xvqg sltd mffn aadm";
        Properties prop = new Properties();
        prop.put("mail.smtp.host", "smtp.gmail.com");
        prop.put("mail.smtp.port", "465");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "false");
        prop.put("mail.smtp.ssl.enable", "true");
        prop.put("mail.smtp.ssl.protocols", "TLSv1.2");
        prop.put("mail.smtp.ssl.checkserveridentity", "false");
        prop.put("mail.smtp.ssl.socketFactory.port", "465");
        prop.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        prop.put("mail.smtp.socketFactory.fallback", "false");

        Session session = Session.getInstance(prop, new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("raniland1404@gmail.com"));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(email)
            );
            message.setSubject("Your OTP for gmail authenticity");
            Random rand = new Random();
            otp = rand.nextInt((999999 - 100000) + 1) + 100000;
            message.setText("Your gmail authentic OTP is: " + otp);
            Transport.send(message);
            otpTime = LocalDateTime.now();
            return true;
        } catch (MessagingException e) {
            e.printStackTrace();
            return false;
        }
    }


    public String checkOTP(int userOTP, int minutesLimit) {
        if (userOTP == otp) {
            LocalDateTime now = LocalDateTime.now();
            long minutesSinceOTP = ChronoUnit.MINUTES.between(otpTime, now);

            if (minutesSinceOTP <= minutesLimit) {
                return "";
            }
            else {
                return "The OTP is overdue!";
            }
        }
        else {
            return "The OTP is incorrect!";
        }
    }

    @PostMapping("/forgotpw")
    ResponseEntity<ResponseObject> checkEmailAndSendOTP(@RequestBody User user) {
        User foundByEmail = userRepository.findByEmail(user.getUserEmail().trim());
        System.out.println(foundByEmail);
        if(foundByEmail != null){
            if(sendOTP(user.getUserEmail().trim())) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Send OTP successfully", foundByEmail));
            }
            else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                        new ResponseObject("failed", "Failed to send OTP", ""));
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Email is not exist or has not been registered", ""));
        }
    }


    @PutMapping("/{id}")
    ResponseEntity<ResponseObject> updateUser(@RequestBody User newUser, @PathVariable Integer id) {
        Optional<User> updateUser = userRepository.findById(id)
                .map(user -> {
                    user.setAvatarUser(newUser.getAvatarUser());
                    user.setDisplayName(newUser.getDisplayName());
                    user.setBioUser(newUser.getBioUser());
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

//    @GetMapping("/{username}")
//    public ResponseEntity<ResponseObject> getUserByUsername(@RequestBody String username) {
//        User foundUser = userRepository.findByUserName(username);
//        return foundUser != null ? ResponseEntity.status(HttpStatus.OK).body(
//                new ResponseObject("ok", "Query user successfully", foundUser))
//                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
//                        new ResponseObject("failed", "Cannot find username", username));
//    }

    @GetMapping("/result")
    public List<Results> getAllResults() {
        List<Results> listR = resultsRepository.findAll();
        for (Results r : listR) {
            r.setAnimalScientificName(
                    animalRepository.findByIDAnimal(r.getPredictedAnimal()).getAnimalScientificName());
        }
        return listR;
    }
    @GetMapping("/result/{iDUser}")
    public List<Results> getAllResultsByiDUser(@PathVariable Integer iDUser) {
        List<Results> listR = resultsRepository.getByiDUser(iDUser);
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
            if (animal != null) {
                Animal clonedAnimal = animal.clone(); // Sao chép đối tượng Animal
                userAnimal.setAnimal(clonedAnimal);
                userAnimal.getAnimal().setAnimalAva(getUser_AlbumByiDUserA(userAnimal.getiDUserAnimal()).getImageLink());
            }
        }
        return found;
    }

    @GetMapping("/animal/search/{search}")
    public List<User_animal> searchUser_animal(@PathVariable String search) {

        List<User_animal> found = new ArrayList<>();
        List<User_animal> allUserAnimals = user_animalRepository.findAll();
        for (User_animal userAnimal : allUserAnimals) {
            Animal animal = animalRepository.findByIDAnimal(userAnimal.getiDAnimal());
            if (animal != null && animal.getAnimalName().toLowerCase().contains(search.toLowerCase())) {
                Animal clonedAnimal = animal.clone();
                userAnimal.setAnimal(clonedAnimal);
                userAnimal.getAnimal().setAnimalAva(getUser_AlbumByiDUserA(userAnimal.getiDUserAnimal()).getImageLink());
                found.add(userAnimal);
            }
        }
        return found;
    }


    @GetMapping("/animal_album/{iDUserAnimal}")
    public List<User_album> getUser_AlbumByiDUserAnimal(@PathVariable Integer iDUserAnimal) {
        return user_albumRepository.findByiDUserAnimal(iDUserAnimal);
    }
    @GetMapping("/animal_album1/{iDUserAnimal}")
    public User_album getUser_AlbumByiDUserA(@PathVariable Integer iDUserAnimal) {
        return user_albumRepository.findByiDUserAnimal(iDUserAnimal).getFirst();
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
                Animal clonedAnimal = animal.clone(); // Sao chép đối tượng Animal
                userAnimal.setAnimal(clonedAnimal);
                userAnimal.getAnimal().setAnimalAva(getUser_AlbumByiDUserA(userAnimal.getiDUserAnimal()).getImageLink());
            }
        }
        return found;
    }

    @GetMapping("/detailPost/{iDUserAnimal}")
    public User_animal getAllUser_animalByiDUserAnimal(@PathVariable Integer iDUserAnimal) {
        User_animal userAnimal = user_animalRepository.findByiDUserAnimal(iDUserAnimal);
            Animal animal = animalRepository.findByIDAnimal(userAnimal.getiDAnimal());
            if(animal != null) {
                Animal clonedAnimal = animal.clone(); // Sao chép đối tượng Animal
                userAnimal.setAnimal(clonedAnimal);
                userAnimal.getAnimal().setAnimalAva(getUser_AlbumByiDUserA(userAnimal.getiDUserAnimal()).getImageLink());
            }
        return userAnimal;
    }
    
    @PostMapping("/postAnimal")
    public ResponseEntity<ResponseObject> postAnimal(@RequestBody List<AnimalPost> requestBody) {
        for (AnimalPost obj : requestBody) {
            System.out.println(obj.getFiles());
            Animal animal = animalRepository.findByAnimalScientificName(obj.getScientificName());
            // Lưu đối tượng User_animal vào cơ sở dữ liệu
            user_animalRepository.saveUserAnimal(obj.getIdUser(),
                    animal.getiDAnimal(), obj.getDateTime(), obj.getLocation(), obj.getNote());
            Integer iDUserAnimal = user_animalRepository.getLastInsertedId();
                    System.out.println(iDUserAnimal);
            if (iDUserAnimal != null) {
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
                .ok(new ResponseObject("Success", "Received, processed, saved, and linked animal objects",
                        requestBody));
    }
    @DeleteMapping("/deletepost/{IDUserAnimal}")
    public ResponseEntity<ResponseObject> deletePost(@PathVariable Integer IDUserAnimal) {
        boolean exist = user_animalRepository.existsById(Long.valueOf(IDUserAnimal));
        if (exist) {
            List<User_album> founds = user_albumRepository.findByiDUserAnimal(IDUserAnimal);
            for (User_album found : founds) {
                user_albumRepository.deleteById(Long.valueOf(found.getiDUserAlbum()));
            }
            user_animalRepository.deleteById(Long.valueOf(IDUserAnimal));
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("oke", "Delete successfully", IDUserAnimal)
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("fail", "This id does not exist", IDUserAnimal)
        );
    }
    @PutMapping("/editpost/{IDUserAnimal}")
    public ResponseEntity<ResponseObject> editPost(@RequestBody String newPostJson, @PathVariable Integer IDUserAnimal) {
        User_animal updatePost = user_animalRepository.findByiDUserAnimal(IDUserAnimal);
        if(updatePost != null) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                User_animal newPost = objectMapper.readValue(newPostJson, User_animal.class);

                // Set the new values to the existing entity
                updatePost.setDate(newPost.getDate());
                updatePost.setLocation(newPost.getLocation());
                updatePost.setNote(newPost.getNote());

                // Save the updated entity
                user_animalRepository.save(updatePost);

                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("ok", "Update successful", updatePost)
                );
            } catch (IOException e) {
                // Handle JSON parsing exception
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        new ResponseObject("fail", "Invalid JSON format", null)
                );
            }
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("fail", "Cannot edit this", newPostJson)
            );
        }
    }

}
