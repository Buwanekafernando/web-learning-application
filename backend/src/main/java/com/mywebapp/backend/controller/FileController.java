package com.mywebapp.backend.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mywebapp.backend.entity.FileEntity;
import com.mywebapp.backend.entity.User;
import com.mywebapp.backend.service.FileService;
import com.mywebapp.backend.service.UserService;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello from FileController!";
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file, Principal principal) {
        try {
            User user = userService.findByUsername(principal.getName());
            Map<String, String> result = fileService.uploadFile(file, user);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Upload failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteFile(@RequestParam("public_id") String publicId, Principal principal) {
        try {
            User user = userService.findByUsername(principal.getName());
            fileService.deleteFile(publicId, user);
            Map<String, String> response = new HashMap<>();
            response.put("status", "ok");
            response.put("public_id", publicId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> listFiles(Principal principal) {
        try {
            User user = userService.findByUsername(principal.getName());
            List<FileEntity> files = fileService.listAllFilesByUser(user);
            return ResponseEntity.ok(files);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to list files: " + e.getMessage()));
        }
    }

    @GetMapping("/download/{publicId}")
    public ResponseEntity<?> downloadFile(@PathVariable String publicId, Principal principal) {
        try {
            User user = userService.findByUsername(principal.getName());
            String fileUrl = fileService.getFileUrl(publicId, user);
            return ResponseEntity.ok(Map.of("url", fileUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get file URL: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Map<String, String>> updateFile(
            @RequestParam("public_id") String publicId,
            @RequestParam("file") MultipartFile newFile,
            Principal principal) {
        try {
            User user = userService.findByUsername(principal.getName());
            Map result = fileService.updateFile(publicId, newFile, user);
            Map<String, String> response = new HashMap<>();
            response.put("status", "updated");
            response.put("public_id", publicId);
            response.put("url", (String) result.get("secure_url"));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Update failed: " + e.getMessage()));
        }
    }

    @PutMapping("/rename")
    public ResponseEntity<Map<String, String>> renameFile(
            @RequestParam("public_id") String publicId,
            @RequestParam("new_file_name") String newFileName,
            Principal principal) {
        try {
            User user = userService.findByUsername(principal.getName());
            FileEntity updatedFile = fileService.renameFile(publicId, newFileName, user);
            Map<String, String> response = new HashMap<>();
            response.put("status", "renamed");
            response.put("public_id", updatedFile.getPublicId());
            response.put("new_file_name", updatedFile.getFileName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Rename failed: " + e.getMessage()));
        }
    }
}


