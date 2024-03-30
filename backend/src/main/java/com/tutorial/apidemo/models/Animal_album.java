package com.tutorial.apidemo.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "animal_album")
public class Animal_album {
    @Id
    Integer iDAnimalAlbum;
    Integer iDAnimal;
    String 	imageLink;

    public Animal_album(Integer iDAnimalAlbum, Integer iDAnimal, String imageLink) {
        this.iDAnimalAlbum = iDAnimalAlbum;
        this.iDAnimal = iDAnimal;
        this.imageLink = imageLink;
    }

    public Animal_album() {
    }

    public Integer getiDAnimalAlbum() {
        return iDAnimalAlbum;
    }

    public void setiDAnimalAlbum(Integer iDAnimalAlbum) {
        this.iDAnimalAlbum = iDAnimalAlbum;
    }

    public Integer getiDAnimal() {
        return iDAnimal;
    }

    public void setiDAnimal(Integer iDAnimal) {
        this.iDAnimal = iDAnimal;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }
}
