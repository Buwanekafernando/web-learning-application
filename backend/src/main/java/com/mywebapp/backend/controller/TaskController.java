package com.mywebapp.backend.controller;

import com.mywebapp.backend.entity.Task;
import com.mywebapp.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

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
        map.put("url", "http://localhost:8080/api/tasks/" + task.getId());
        return map;
    }

    @GetMapping
    public List<Map<String, Object>> getAll() {
        return service.getAll().stream().map(this::toTaskResponse).collect(Collectors.toList());
    }

    @PostMapping
    public Map<String, Object> create(@Valid @RequestBody Task task) {
        Task saved = service.create(task);
        return toTaskResponse(saved);
    }

    @PutMapping("/{id}")
    public Map<String, Object> update(@PathVariable Long id, @Valid @RequestBody Task task) {
        Task updated = service.update(id, task);
        return toTaskResponse(updated);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
