package com.tutorial.apidemo;

import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;

@SpringBootApplication
public class SpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootApplication.class, args);

		try {
			// Đọc credentials từ file JSON
			GoogleCredentials credentials = GoogleCredentials.fromStream(
					new FileInputStream("D:\\VisualStudioCode\\Project\\Identify_rare_animals\\backend\\src\\main\\resources\\serviceAccountKey.json"));

			// Tạo một Storage object với credentials và project ID
			Storage storage = StorageOptions.newBuilder()
					.setCredentials(credentials)
					.setProjectId("rare-animals")
					.build()
					.getService();

			// Lấy danh sách các bucket
			Page<Bucket> bucketsPage = storage.list();

			// Lặp qua từng bucket trên trang và in ra tên của từng bucket
			for (Bucket bucket : bucketsPage.iterateAll()) {
				System.out.println("Bucket name: " + bucket.getName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
