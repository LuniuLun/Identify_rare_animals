package com.tutorial.apidemo.models;


import java.util.Date;
import java.util.List;

public class AnimalPost {
    private Integer idUser;
    private String speciesName;
    private List<String> files;
    private String location;
    private Date dateTime;
    private String note;

    // Constructors
    public AnimalPost() {
        // Khởi tạo không tham số
    }

    public AnimalPost(Integer idUser, String speciesName, List<String> files, String location, Date dateTime, String note) {
        this.idUser = idUser;
        this.speciesName = speciesName;
        this.files = files;
        this.location = location;
        this.dateTime = dateTime;
        this.note = note;
    }

    // Getters and Setters
    public Integer getIdUser() {
        return idUser;
    }

    public void setIdUser(Integer idUser) {
        this.idUser = idUser;
    }

    public String getSpeciesName() {
        return speciesName;
    }

    public void setSpeciesName(String speciesName) {
        this.speciesName = speciesName;
    }

    public List<String> getFiles() {
        return files;
    }

    public void setFiles(List<String> files) {
        this.files = files;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    // toString method
    @Override
    public String toString() {
        return "AnimalPost{" +
                "idUser=" + idUser +
                ", speciesName='" + speciesName + '\'' +
                ", files=" + files +
                ", location='" + location + '\'' +
                ", dateTime='" + dateTime + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
