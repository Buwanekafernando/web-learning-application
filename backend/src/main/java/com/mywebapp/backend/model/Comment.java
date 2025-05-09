package com.mywebapp.backend.model;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private LocalDateTime commentedAt;

    private Long postId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",insertable = true, updatable = true) // assumes foreign key in DB
    private User user;
    private String content;
}