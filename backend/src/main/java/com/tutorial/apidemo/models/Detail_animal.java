package com.tutorial.apidemo.models;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="detail_animal")
public class Detail_animal {
    @Id
    @Column(name = "IDDetail")
    private Integer iDDetail;
    private String appearance;
    private String habits;
    private String continents;
    private String countries;
    private String wwfBiomes;
    private String levelOfDanger;
    private String theRemainAmount;

    public Detail_animal() {
    }

    public Detail_animal(Integer iDDetail, String appearance, String habits, String continents, String countries, String wwfBiomes, String levelOfDanger, String theRemainAmount) {
        this.iDDetail = iDDetail;
        this.appearance = appearance;
        this.habits = habits;
        this.continents = continents;
        this.countries = countries;
        this.wwfBiomes = wwfBiomes;
        this.levelOfDanger = levelOfDanger;
        this.theRemainAmount = theRemainAmount;
    }

    public Integer getiDDetail() {
        return iDDetail;
    }

    public void setiDDetail(Integer iDDetail) {
        this.iDDetail = iDDetail;
    }

    public String getAppearance() {
        return appearance;
    }

    public void setAppearance(String appearance) {
        this.appearance = appearance;
    }

    public String getHabits() {
        return habits;
    }

    public void setHabits(String habits) {
        this.habits = habits;
    }

    public String getContinents() {
        return continents;
    }

    public void setContinents(String continents) {
        this.continents = continents;
    }

    public String getCountries() {
        return countries;
    }

    public void setCountries(String countries) {
        this.countries = countries;
    }

    public String getWwfBiomes() {
        return wwfBiomes;
    }

    public void setWwfBiomes(String wwfBiomes) {
        this.wwfBiomes = wwfBiomes;
    }

    public String getLevelOfDanger() {
        return levelOfDanger;
    }

    public void setLevelOfDanger(String levelOfDanger) {
        this.levelOfDanger = levelOfDanger;
    }

    public String getTheRemainAmount() {
        return theRemainAmount;
    }

    public void setTheRemainAmount(String theRemainAmount) {
        this.theRemainAmount = theRemainAmount;
    }
}
