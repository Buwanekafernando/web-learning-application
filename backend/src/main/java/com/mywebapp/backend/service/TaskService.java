package com.mywebapp.backend.service;

import com.mywebapp.backend.entity.Task;
import com.mywebapp.backend.repo.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    // Get all tasks
    public List<Task> getAll() {
        return repo.findAll();
    }

    // Create new task
    public Task create(Task task) {
        return repo.save(task);
    }

    // Update task by ID
    public Task update(Long id, Task updated) {
        return repo.findById(id).map(task -> {
            task.setTitle(updated.getTitle());
            task.setDate(updated.getDate());
            task.setStarred(updated.getStarred());
            return repo.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found"));
    }
    

    // Delete task by ID
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
