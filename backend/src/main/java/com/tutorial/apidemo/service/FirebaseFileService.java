package com.tutorial.apidemo.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;

@Service
public class FirebaseFileService {

    private Storage storage;

    @EventListener
    public void init(ApplicationReadyEvent event) {
        try {
            ClassPathResource serviceAccount = new ClassPathResource("serviceAccountKey.json");
            storage = StorageOptions.newBuilder().
                    setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream())).
                    setProjectId("rare-animals").build().getService();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public String saveTest(MultipartFile file) {
        try {
            // Kiểm tra loại file trước khi tải lên
            if (!isValidFileType(file)) {
                throw new IllegalArgumentException("Invalid file type.");
            }

            // Tạo tên file duy nhất
            String imageName = generateFileName(file.getOriginalFilename());

            // Tạo metadata cho file
            Map<String, String> metadata = new HashMap<>();
            metadata.put("firebaseStorageDownloadTokens", imageName);

            // Tạo BlobInfo cho file với metadata
            BlobId blobId = BlobId.of("rare-animals.appspot.com", imageName);
            BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                    .setContentType(file.getContentType())
                    .setMetadata(metadata)
                    .build();

            // Upload file lên Google Cloud Storage
            Blob blob = storage.create(blobInfo, file.getBytes());

            // Lấy URL của file vừa được upload
            String imageUrl = "https://firebasestorage.googleapis.com/v0/b/rare-animals.appspot.com/o/" + imageName + "?alt=media&token=" + imageName;

            // In ra thông tin sau khi upload
            System.out.println("Uploaded Successfully. Image URL: " + imageUrl);

            return imageUrl;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload file.");
        }
    }

    private boolean isValidFileType(MultipartFile file) {
        // Thực hiện kiểm tra loại file ở đây (ví dụ: kiểm tra đuôi mở rộng)
        // Trong ví dụ này, mọi loại file được chấp nhận
        return true;
    }
    private String generateFileName(String originalFileName) {
        return UUID.randomUUID().toString() + "." + getExtension(originalFileName);
    }

    private String getExtension(String originalFileName) {
        return StringUtils.getFilenameExtension(originalFileName);
    }
}