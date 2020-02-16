package com.runz.pmt.services;

import com.runz.pmt.domain.Project;
import com.runz.pmt.exceptions.ProjectIdException;
import com.runz.pmt.repositories.ProjectRepository;

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

    public Iterable<Project> findAll() {
        return projectRepository.findAll();
    }

    public void deleteByProjectIdentifier(String identifier) {
        Project project = projectRepository.findByProjectIdentifier(identifier.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("Project under ID: " + identifier.toUpperCase() + ", does not exist");
        }

        projectRepository.delete(project);
    }

}