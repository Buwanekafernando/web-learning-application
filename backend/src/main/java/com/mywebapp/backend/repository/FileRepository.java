package com.mywebapp.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mywebapp.backend.entity.FileEntity;
import com.mywebapp.backend.entity.User;

public interface FileRepository extends JpaRepository<FileEntity, Long> { 
    FileEntity findByPublicId(String publicId); 

    List<FileEntity> findAllByUser(User user);

    FileEntity findByPublicIdAndUser(String publicId, User user);
}
