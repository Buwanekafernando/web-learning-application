

package com.mywebapp.backend.service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class FileService {

    @Autowired
    private Cloudinary cloudinary;

    public Map<String, String> uploadFile(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

        Map<String, String> result = new HashMap<>();
        result.put("url", uploadResult.get("secure_url").toString());
        result.put("public_id", uploadResult.get("public_id").toString());
        return result;
    }

    public Map uploadFileWithDetails(MultipartFile file) throws IOException {
        File uploadedFile = File.createTempFile("temp", file.getOriginalFilename());
        file.transferTo(uploadedFile);

        Map uploadResult = cloudinary.uploader().upload(uploadedFile, ObjectUtils.emptyMap());
        uploadedFile.delete();
        return uploadResult;
    }

    public List<Map<String, Object>> listAllFiles() throws Exception {
        Map result = cloudinary.api().resources(ObjectUtils.emptyMap());
        return (List<Map<String, Object>>) result.get("resources");
    }

    public String getFileUrl(String publicId) {
        return cloudinary.url().secure(true).generate(publicId);
    }
    


    public Map deleteFile(String publicId) throws IOException {
        return cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
    
    public Map updateFile(String publicId, MultipartFile newFile) throws IOException {
        return cloudinary.uploader().upload(
            newFile.getBytes(),
            ObjectUtils.asMap(
                "public_id", publicId,         // overwrite this file
                "overwrite", true,             // allow overwriting
                "resource_type", "auto"        // detect file type automatically
            )
        );
    }




}

