package com.tutorial.apidemo.controllers;

import com.tutorial.apidemo.service.FirebaseFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController {

    private final FirebaseFileService storageService;

    @Autowired
    public ImageController(FirebaseFileService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/upload")
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = storageService.storeFile(file);
        return imageUrl;
    }
}
