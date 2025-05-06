

package com.mywebapp.backend.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.mywebapp.backend.entity.FileEntity;
import com.mywebapp.backend.entity.User;
import com.mywebapp.backend.repository.FileRepository;

@Service
public class FileService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private FileRepository fileRepository;

    public FileEntity saveFileEntity(FileEntity fileEntity) {
        return fileRepository.save(fileEntity);
    }

    public Map<String, String> uploadFile(MultipartFile file, User user) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

        FileEntity fileEntity = new FileEntity();
        fileEntity.setPublicId(uploadResult.get("public_id").toString());
        fileEntity.setUrl(uploadResult.get("secure_url").toString());
        fileEntity.setFileType(file.getContentType());
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setUser(user);

        fileRepository.save(fileEntity);

        Map<String, String> result = new HashMap<>();
        result.put("url", fileEntity.getUrl());
        result.put("public_id", fileEntity.getPublicId());
        return result;
    }

    public List<FileEntity> listAllFilesByUser(User user) {
        return fileRepository.findAllByUser(user);
    }

    public String getFileUrl(String publicId, User user) throws Exception {
        FileEntity fileEntity = fileRepository.findByPublicIdAndUser(publicId, user);
        if (fileEntity == null) {
            throw new Exception("File not found or access denied");
        }
        return fileEntity.getUrl();
    }

    public void deleteFile(String publicId, User user) throws IOException, Exception {
        FileEntity fileEntity = fileRepository.findByPublicIdAndUser(publicId, user);
        if (fileEntity == null) {
            throw new Exception("File not found or access denied");
        }
        cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        fileRepository.delete(fileEntity);
    }

    public Map updateFile(String publicId, MultipartFile newFile, User user) throws IOException, Exception {
        FileEntity fileEntity = fileRepository.findByPublicIdAndUser(publicId, user);
        if (fileEntity == null) {
            throw new Exception("File not found or access denied");
        }
        Map uploadResult = cloudinary.uploader().upload(
            newFile.getBytes(),
            ObjectUtils.asMap(
                "public_id", publicId,         // overwrite this file
                "overwrite", true,             // allow overwriting
                "resource_type", "auto"        // detect file type automatically
            )
        );
        fileEntity.setUrl(uploadResult.get("secure_url").toString());
        fileEntity.setFileName(newFile.getOriginalFilename());
        fileRepository.save(fileEntity);
        return uploadResult;
    }

    public FileEntity renameFile(String publicId, String newFileName, User user) throws Exception {
        FileEntity fileEntity = fileRepository.findByPublicIdAndUser(publicId, user);
        if (fileEntity == null) {
            throw new Exception("File not found or access denied");
        }
        fileEntity.setFileName(newFileName);
        return fileRepository.save(fileEntity);
    }
}

