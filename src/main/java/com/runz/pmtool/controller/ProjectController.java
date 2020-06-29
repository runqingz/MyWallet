package com.runz.pmtool.controller;

import java.security.Principal;

import javax.validation.Valid;

import com.runz.pmtool.domain.Project;
import com.runz.pmtool.services.MapValidationService;
import com.runz.pmtool.services.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationService mapValidationService;

    @PostMapping("")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationService.validateMap(result);

        if (errorMap != null)
            return errorMap;

        Project project1 = projectService.saveOrUpdateProject(project, principal.getName());
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getByProjectIdentifier(@PathVariable String projectId) {
        return new ResponseEntity<Project>(projectService.findByProjectIdentifier(projectId), HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects() {
        return projectService.findAll();
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteByProjectIdentifier(@PathVariable String projectId) {
        projectService.deleteByProjectIdentifier(projectId);

        return new ResponseEntity<String>("Project under ID: " + projectId + ", deleted", HttpStatus.OK);
    }
    
}