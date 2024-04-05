package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.Results;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultsRepository extends JpaRepository<Results, Long> {
    public List<Results> getByiDUser(Integer iDUser);
}
