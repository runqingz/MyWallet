package com.runz.pmtool.services;

import com.runz.pmtool.domain.Backlog;
import com.runz.pmtool.domain.Project;
import com.runz.pmtool.domain.User;
import com.runz.pmtool.exceptions.ProjectIdException;
import com.runz.pmtool.repositories.BacklogRepository;
import com.runz.pmtool.repositories.ProjectRepository;
import com.runz.pmtool.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdateProject(Project project, String username) {
        String upperCaseIdentifier = project.getProjectIdentifier().toUpperCase();

        try {
            User user = userRepository.findByUsername(username);

            project.setUser(user);
            project.setCreator(user.getUsername());
            project.setProjectIdentifier(upperCaseIdentifier);
            if (project.getId() == 0L) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(upperCaseIdentifier);
            } else {
                Backlog backlog = backlogRepository.findByProjectIdentifier(upperCaseIdentifier);
                project.setBacklog(backlog);
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project with ID: " + upperCaseIdentifier + " Already exists!");
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
