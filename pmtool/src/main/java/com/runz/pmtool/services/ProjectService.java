package com.runz.pmtool.services;

import com.runz.pmtool.domain.Project;
import com.runz.pmtool.exceptions.ProjectIdException;
import com.runz.pmtool.repositories.ProjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException(
                    "Project ID: " + project.getProjectIdentifier().toUpperCase() + ", Already exists");
        }
    }

    public Project findByProjectIdentifier(String identifier) {
        Project project = projectRepository.findByProjectIdentifier(identifier.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("Project under ID: " + identifier.toUpperCase() + ", does not exist");
        }

        return project;
    }

<<<<<<< HEAD
    <<<<<<<HEAD

    public Iterable<Project> findAll() {
        return projectRepository.findAll();
    }

    public void deleteByProjectIdentifier(String identifier) {
        Project project = projectRepository.findByProjectIdentifier(identifier.toUpperCase());

        if (project == null) {
=======

=======
>>>>>>> formatting
    public Iterable<Project> findAll() {
        return projectRepository.findAll();
    }

    public void deleteByProjectIdentifier(String identifier) {
        Project project = projectRepository.findByProjectIdentifier(identifier.toUpperCase());

<<<<<<< HEAD
        if(project == null){
>>>>>>> Project Entity CRUD functions
=======
        if (project == null) {
>>>>>>> formatting
            throw new ProjectIdException("Project under ID: " + identifier.toUpperCase() + ", does not exist");
        }

        projectRepository.delete(project);
    }

}