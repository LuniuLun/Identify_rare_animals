package com.tutorial.apidemo.repositories;

import com.tutorial.apidemo.models.Results;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultsRepository extends JpaRepository<Results, Long> {
}
