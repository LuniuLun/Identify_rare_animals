package com.tutorial.apidemo.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name ="results")
public class Results {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer iDResult;
    private Integer iDUser;
    private String imageLink;
    private Integer predictedAnimal;
    private Float predictedAccuracy;
    private Date date;
    @Transient
    private String animalScientificName;

    public String getAnimalScientificName() {
        return animalScientificName;
    }

    public void setAnimalScientificName(String animalScientificName) {
        this.animalScientificName = animalScientificName;
    }

    public Results() {
    }

    public Results(Integer iDResult, Integer iDUser, String imageLink, Integer predictedAnimal, Float predictedAccuracy, Date date) {
        this.iDResult = iDResult;
        this.iDUser = iDUser;
        this.imageLink = imageLink;
        this.predictedAnimal = predictedAnimal;
        this.predictedAccuracy = predictedAccuracy;
        this.date = date;
    }

    public Integer getiDResult() {
        return iDResult;
    }

    public void setiDResult(Integer iDResult) {
        this.iDResult = iDResult;
    }

    public Integer getiDUser() {
        return iDUser;
    }

    public void setiDUser(Integer iDUser) {
        this.iDUser = iDUser;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public Integer getPredictedAnimal() {
        return predictedAnimal;
    }

    public void setPredictedAnimal(Integer predictedAnimal) {
        this.predictedAnimal = predictedAnimal;
    }

    public Float getPredictedAccuracy() {
        return predictedAccuracy;
    }

    public void setPredictedAccuracy(Float predictedAccuracy) {
        this.predictedAccuracy = predictedAccuracy;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
