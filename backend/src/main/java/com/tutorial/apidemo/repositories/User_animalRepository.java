package com.tutorial.apidemo.repositories;
import com.tutorial.apidemo.models.User_animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Date;
public interface User_animalRepository extends JpaRepository<User_animal, Long> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO user_animal (IDUser, IDAnimal, Date, Location, Note) VALUES (:idUser, :iDAnimal, :date, :location, :note)", nativeQuery = true)
    void saveUserAnimal(@Param("idUser") Integer idUser, @Param("iDAnimal") Integer iDAnimal, @Param("date") Date date, @Param("location") String location, @Param("note") String note);
    @Query(value = "SELECT LAST_INSERT_ID() AS IDUserAnimal", nativeQuery = true)
    Integer getLastInsertedId();


    List<User_animal> findByiDUser(Integer iDUser);
    User_animal findByiDUserAnimal(Integer iDUserAnimal);
}