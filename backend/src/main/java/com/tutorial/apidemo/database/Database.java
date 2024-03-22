package com.tutorial.apidemo.database;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.tutorial.apidemo.models.User;
import com.tutorial.apidemo.repositories.UserRepository;

/*
docker run -d --rm --name mysql-spring-boot-tutorial -e MYSQL_ROOT_PASSWORD= -e MYSQL_USER=root -e MYSQL_PASSWORD= -e MYSQL_DATABASE=test_db -p 3309:3306 --volume mysql-spring-boot-tutorial-volume:/var/lib/mysql mysql:latest 
docker exec -it my-container mysql -u root -p


 */
@Configuration
public class Database {
    private static final Logger logger = LoggerFactory.getLogger(Database.class);
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        //logger
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
//              User userA = new User("ducvan",  "123456", "Nguyen Duc Van", "nguyenducvan260903@gmail.com", "VietNam", 100, 50, 30, 20, 50, 2000, "2/12/2022", "Common baby");
//              User userB = new User("kieunhi", "123456", "Ngo Kieu Nhi", "kieunhi2003@gmail.com", "Japanese",50, 50, 0, 0, 100, 3000, "12/9/2023", "I love you");
//              logger.info("insert data: " + userRepository.save(userA));
//              logger.info("insert data: " + userRepository.save(userB));
            }

        };
    }
}
