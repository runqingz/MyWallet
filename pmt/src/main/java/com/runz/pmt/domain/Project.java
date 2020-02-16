package com.runz.pmt.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

<<<<<<< HEAD
=======

>>>>>>> Project Entity CRUD functions
@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "Project Name is required")
    private String projectName;
    @NotBlank(message = "Project Identifier is required")
    @Size(min = 3, max = 5, message = "Please use a identifier between 3 and 5 characters")
    @Column(updatable = false, unique = true)
    private String projectIdentifier;
    @NotBlank(message = "Project Description is required")
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date crearedAt;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date modifiedAt;

    public Project() {
    }

    public long getId() {
        return this.id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getProjectName() {
        return this.projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectIdentifier() {
        return this.projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Date getCrearedAt() {
        return this.crearedAt;
    }

    public void setCrearedAt(Date crearedAt) {
        this.crearedAt = crearedAt;
    }

    public Date getModifiedAt() {
        return this.modifiedAt;
    }

    public void setModifiedAt(Date modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

<<<<<<< HEAD
=======

>>>>>>> Project Entity CRUD functions
    @PrePersist
    protected void onCreate() {
        this.modifiedAt = new Date();
        this.crearedAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.modifiedAt = new Date();
    }

}
