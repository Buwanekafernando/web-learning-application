package com.mywebapp.backend.model;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @CreationTimestamp
    @Column(updatable = false)
    private String commentedAt;

    private Long postId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",insertable = true, updatable = true) // assumes foreign key in DB
    @JsonBackReference 
    private User user;
    private String content;
}