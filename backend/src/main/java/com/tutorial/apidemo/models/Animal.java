package com.tutorial.apidemo.models;

import jakarta.persistence.*;

@Entity
@Table(name = "animals")
public class Animal {
    @Id
    @Column(name = "IDAnimal")
    private Integer iDAnimal;
    private String animalName;
    private String animalScientificName;
    private Integer iDDetail;
    @Transient
    private String animalAva;

    public Animal() {
    }

    public Animal(Integer iDAnimal, String animalName, String animalScientificName, Integer iDDetail) {
        this.iDAnimal = iDAnimal;
        this.animalName = animalName;
        this.animalScientificName = animalScientificName;
        this.iDDetail = iDDetail;
    }

    public Integer getiDAnimal() {
        return iDAnimal;
    }

    public void setiDAnimal(Integer iDAnimal) {
        this.iDAnimal = iDAnimal;
    }

    public String getAnimalName() {
        return animalName;
    }

    public void setAnimalName(String animalName) {
        this.animalName = animalName;
    }

    public String getAnimalScientificName() {
        return animalScientificName;
    }

    public void setAnimalScientificName(String animalScientificName) {
        this.animalScientificName = animalScientificName;
    }

    public Integer getiDDetail() {
        return iDDetail;
    }

    public void setiDDetail(Integer iDDetail) {
        this.iDDetail = iDDetail;
    }

    public String getAnimalAva() {
        return animalAva;
    }

    public void setAnimalAva(String animalAva) {
        this.animalAva = animalAva;
    }
}
