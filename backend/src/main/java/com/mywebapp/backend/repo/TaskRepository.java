package com.mywebapp.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mywebapp.backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // no need to write anything – Spring handles everything!
}
