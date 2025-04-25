package com.mywebapp.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Optional, especially for POST APIs like file upload
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers(
                        "/", 
                        "/login/**", 
                        "/error", 
                        "/oauth2/**",
                        "/api/files/upload",
                         "/api/files/delete",
                         "/api/files/list",
                         "/api/files/update"
                    ).permitAll()
                    .anyRequest().authenticated()
                )
                .oauth2Login(Customizer.withDefaults())
                .build();
    }
}
