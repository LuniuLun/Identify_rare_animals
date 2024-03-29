package com.tutorial.apidemo.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="user")
public class User {
    @Id
    private Integer iDUser;
    private String username;
    private String password;
    private String email;
    private String displayName;
    private String bio;
    private String avatar;
    private String role;

    public User(Integer iDUser, String username, String password, String email, String displayName, String bio, String avatar, String role) {
        this.iDUser = iDUser;
        this.username = username;
        this.password = password;
        this.email = email;
        this.displayName = displayName;
        this.bio = bio;
        this.avatar = avatar;
        this.role = role;
    }

    public User() {
    }

    public Integer getiDUser() {
        return iDUser;
    }

    public void setiDUser(Integer iDUser) {
        this.iDUser = iDUser;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
