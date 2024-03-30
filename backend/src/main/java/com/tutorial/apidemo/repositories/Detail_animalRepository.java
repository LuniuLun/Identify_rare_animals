package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.Detail_animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface Detail_animalRepository extends JpaRepository<Detail_animal, Long> {
    @Query("SELECT d FROM Detail_animal d WHERE d.iDDetail = :iDDetail")
    Detail_animal findByIDDetail(@Param("iDDetail") Integer iDDetail);

}
