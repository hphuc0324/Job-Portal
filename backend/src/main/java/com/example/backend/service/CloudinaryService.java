package com.example.backend.service;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    @Value("${cloudinary.cloudinary-folder}")
    private String folder;

    public Map upload(MultipartFile file, String subFolder){
        try{
            Map data = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of("folder", "/Job Portal" + subFolder)
                    );

            return data;
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
