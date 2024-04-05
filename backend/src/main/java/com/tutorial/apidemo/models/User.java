package com.tutorial.apidemo.models;

import java.util.Objects;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "IDUser")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer iDUser;
    @Column(name = "Username")
    private String userName;
    @Column(name = "Password")
    private String userPassword;
    @Column(name = "Email")
    private String userEmail;
    @Column(name = "DisplayName")
    private String displayName;
    @Column(name = "Bio")
    private String bioUser;
    @Column(name = "Avatar")
    private String avatarUser;
    @Column(name = "Role")
    private int roleAcc;

    public User() {
    }
    public User(Integer iDUser, String userName, String userPassword, String userEmail, String displayName, String bioUser, String avatarUser, int roleAcc) {
        this.iDUser = iDUser;
        this.userName = userName;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.displayName = displayName;
        this.bioUser = bioUser;
        this.avatarUser = avatarUser;
        this.roleAcc = roleAcc;
    }

    public Integer getiDUser() {
        return iDUser;
    }

    public void setiDUser(Integer iDUser) {
        this.iDUser = iDUser;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getBioUser() {
        return bioUser;
    }

    public void setBioUser(String bioUser) {
        this.bioUser = bioUser;
    }

    public String getAvatarUser() {
        return avatarUser;
    }

    public void setAvatarUser(String avatarUser) {
        this.avatarUser = avatarUser;
    }

    public int getRoleAcc() {
        return roleAcc;
    }

    public void setRoleAcc(int roleAcc) {
        this.roleAcc = roleAcc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return roleAcc == user.roleAcc && Objects.equals(iDUser, user.iDUser) && Objects.equals(userName, user.userName) && Objects.equals(userPassword, user.userPassword) && Objects.equals(userEmail, user.userEmail) && Objects.equals(displayName, user.displayName) && Objects.equals(bioUser, user.bioUser) && Objects.equals(avatarUser, user.avatarUser);
    }

    @Override
    public int hashCode() {
        return Objects.hash(iDUser, userName, userPassword, userEmail, displayName, bioUser, avatarUser, roleAcc);
    }

    @Override
    public String toString() {
        return "User{" +
                "iDUser=" + iDUser +
                ", userName='" + userName + '\'' +
                ", userPassword='" + userPassword + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", displayName='" + displayName + '\'' +
                ", bioUser='" + bioUser + '\'' +
                ", avatarUser='" + avatarUser + '\'' +
                ", roleAcc=" + roleAcc +
                '}';
    }
}
