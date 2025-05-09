package com.mywebapp.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/register").permitAll() // Public endpoint
                .requestMatchers("/api/comments/**").permitAll() // Allow public access to comments 
                .anyRequest().authenticated() // Secure other endpoints
            )
            .httpBasic(Customizer.withDefaults()); // Optional: enable basic auth for testing

        return http.build();
    }
}
