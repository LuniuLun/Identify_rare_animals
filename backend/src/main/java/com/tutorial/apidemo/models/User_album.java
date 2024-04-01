package com.tutorial.apidemo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="user_album")
public class User_album {
    @Id
    @Column(name = "IDUserAlbum ")
    private Integer iDUserAlbum;
    @Column(name = "IDUserAnimal ")
    private Integer iDUserAnimal;
    @Column(name = "ImageLink")
    private String imageLink;

    public User_album() {
    }

    public User_album(Integer iDUserAlbum, Integer iDUserAnimal, String imageLink) {
        this.iDUserAlbum = iDUserAlbum;
        this.iDUserAnimal = iDUserAnimal;
        this.imageLink = imageLink;
    }

    public Integer getiDUserAlbum() {
        return iDUserAlbum;
    }

    public void setiDUserAlbum(Integer iDUserAlbum) {
        this.iDUserAlbum = iDUserAlbum;
    }

    public Integer getiDUserAnimal() {
        return iDUserAnimal;
    }

    public void setiDUserAnimal(Integer iDUserAnimal) {
        this.iDUserAnimal = iDUserAnimal;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }
}
