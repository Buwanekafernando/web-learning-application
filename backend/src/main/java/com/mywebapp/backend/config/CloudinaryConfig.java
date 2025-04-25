
 package com.mywebapp.backend.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "df6xom7pn",
                "api_key", "675365295824344",
                "api_secret", "dKRzN6IgaqBTR4iTx9bx_e1p31g"
        ));
    }
}

