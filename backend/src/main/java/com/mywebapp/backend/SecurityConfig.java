package com.mywebapp.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
            
                .requestMatchers("/api/register").permitAll()
                .requestMatchers("/api/comments/**").permitAll()
                .requestMatchers("/api/likes/**").permitAll() // Allow public access to comments 
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()); // Enable basic authentication

        return http.build();
    }

    
}
