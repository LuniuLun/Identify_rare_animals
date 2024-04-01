package com.tutorial.apidemo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

import java.util.Date;

@Entity
@Table(name = "user_animal")
public class User_animal {
    @Id
    private Integer iDUserAnimal;
    private Integer iDUser;
    private Integer iDAnimal;
    private Date date;
    private String location;
    private String note;
    @Transient
    private Animal animal;

    public User_animal() {
    }

    public User_animal(Integer iDUserAnimal, Integer iDUser, Integer iDAnimal, Date date, String location, String note) {
        this.iDUserAnimal = iDUserAnimal;
        this.iDUser = iDUser;
        this.iDAnimal = iDAnimal;
        this.date = date;
        this.location = location;
        this.note = note;
    }

    public Integer getiDUserAnimal() {
        return iDUserAnimal;
    }

    public void setiDUserAnimal(Integer iDUserAnimal) {
        this.iDUserAnimal = iDUserAnimal;
    }

    public Integer getiDUser() {
        return iDUser;
    }

    public void setiDUser(Integer iDUser) {
        this.iDUser = iDUser;
    }

    public Integer getiDAnimal() {
        return iDAnimal;
    }

    public void setiDAnimal(Integer iDAnimal) {
        this.iDAnimal = iDAnimal;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
}
