package com.mywebapp.backend.controller;

import com.mywebapp.backend.entity.Task;
import com.mywebapp.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    private Map<String, Object> toTaskResponse(Task task) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", task.getId());
        map.put("title", task.getTitle());
        map.put("date", task.getDate());
        map.put("starred", task.getStarred());
        map.put("userId", task.getUserId());
        return map;
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        try {
            List<Map<String, Object>> tasks = service.getAll()
                .stream()
                .map(this::toTaskResponse)
                .collect(Collectors.toList());
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            logger.error("Error getting all tasks", e);
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Task task) {
        try {
            // Set default userId if not provided
            if (task.getUserId() == null) {
                task.setUserId(0L);
            }
            
            logger.info("Creating task: {}", task);
            Task saved = service.create(task);
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(toTaskResponse(saved));
        } catch (Exception e) {
            logger.error("Error creating task: {}", task, e);
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to create task: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(error);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody Task task) {
        try {
            // Set default userId if not provided
            if (task.getUserId() == null) {
                task.setUserId(0L);
            }
            
            logger.info("Updating task {}: {}", id, task);
            Task updated = service.update(id, task);
            return ResponseEntity.ok(toTaskResponse(updated));
        } catch (Exception e) {
            logger.error("Error updating task {}: {}", id, task, e);
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to update task: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            logger.info("Deleting task: {}", id);
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting task: {}", id, e);
            Map<String, String> error = new HashMap<>();
            error.put("message", "Failed to delete task: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(error);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        logger.error("Unhandled exception", e);
        Map<String, String> error = new HashMap<>();
        error.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(error);
    }
}
