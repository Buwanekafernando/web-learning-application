package com.mywebapp.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String caption;
    private String imageUrl;

   // @CreationTimestamp
    //private Timestamp createdAt;

    //@UpdateTimestamp
    //private Timestamp updatedAt;
}
