package com.mywebapp.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;

    private Boolean starred = false;

    @Column(name = "user_id", nullable = false)
    private Long userId = 0L; // Default to 0 as shown in your database

   /*  @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;*/

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public Boolean getStarred() { return starred; }
    public void setStarred(Boolean starred) { this.starred = starred; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    // Override toString for better logging
    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", date=" + date +
                ", starred=" + starred +
                ", userId=" + userId +
                '}';
    }
}
