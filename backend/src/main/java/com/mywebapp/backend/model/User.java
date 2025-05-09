
package com.mywebapp.backend.model;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;



    private String name;
    private String email;
    private String phone;
    private String username;
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Comment> comments;

    

}
