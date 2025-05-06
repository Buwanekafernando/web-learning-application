
package com.mywebapp.backend.security;

import java.io.IOException;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.mywebapp.backend.entity.User;
import com.mywebapp.backend.repository.UserRepository;

import jakarta.servlet.ServletException;

@Component
public class CustomOAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;

    // Constructor injection of UserRepository
    public CustomOAuth2LoginSuccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(jakarta.servlet.http.HttpServletRequest request,
                                         jakarta.servlet.http.HttpServletResponse response,
                                         Authentication authentication) throws IOException, ServletException {

        // Get the OAuth2 user object
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // Extract email from the OAuth2 attributes (Google provides 'email' by default)
        String email = (String) attributes.get("email");

        // Check if the user exists in the database
        if (!userRepository.existsByEmail(email)) {
            // If user doesn't exist, create a new user record
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername((String) attributes.get("name")); // Set username from OAuth2 attributes
            // Set any other attributes as needed (e.g., profile picture, name, etc.)
            
            userRepository.save(newUser);  // Save the user to the database
        }

        // Set the user in the security context
        Authentication newAuthentication = new OAuth2AuthenticationToken(oAuth2User, oAuth2User.getAuthorities(), "google");
        SecurityContextHolder.getContext().setAuthentication(newAuthentication);

        // Redirect to home page after successful login
        response.sendRedirect("http://localhost:3000/home"); // Ensure "/home" is the right route in your frontend
    }
}