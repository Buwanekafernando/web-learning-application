
package com.mywebapp.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mywebapp.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
