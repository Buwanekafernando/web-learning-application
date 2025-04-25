package com.mywebapp.backend.controller;

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

import com.mywebapp.backend.service.FileService;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from FileController!";
    }

    @Autowired
    private FileService fileService;

    

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            Map<String, String> result = fileService.uploadFile(file);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Upload failed: " + e.getMessage()));
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteFile(@RequestParam("public_id") String publicId) {
        try {
            Map result = fileService.deleteFile(publicId);
            Map<String, String> response = new HashMap<>();
            response.put("status", (String) result.get("result")); // Cloudinary returns "result": "ok"
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
    public ResponseEntity<?> listFiles() {
        try {
            List<Map<String, Object>> files = fileService.listAllFiles(); // 👈 correct typing
            return ResponseEntity.ok(files); // will return JSON in Postman
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to list files: " + e.getMessage()));
        }
    }
    

    @GetMapping("/download/{publicId}")
    public ResponseEntity<?> downloadFile(@PathVariable String publicId) {
        try {
            String fileUrl = fileService.getFileUrl(publicId);
            return ResponseEntity.ok(Map.of("url", fileUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to get file URL: " + e.getMessage());
        }
    }


    @PutMapping("/update")
public ResponseEntity<Map<String, String>> updateFile(
    @RequestParam("public_id") String publicId,
    @RequestParam("file") MultipartFile newFile) {

    try {
        Map result = fileService.updateFile(publicId, newFile);
        Map<String, String> response = new HashMap<>();
        response.put("status", "updated");
        response.put("public_id", publicId);
        response.put("url", (String) result.get("secure_url"));
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of("error", "Update failed: " + e.getMessage()));
    }
}

}


