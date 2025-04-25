package com.mywebapp.backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mywebapp.backend.entity.Message;
import com.mywebapp.backend.repository.MessageRepository;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    // GET all messages
    @GetMapping
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    // GET messages by conversation ID
    @GetMapping("/conversation/{id}")
    public List<Message> getMessagesByConversationId(@PathVariable Long id) {
        return messageRepository.findByConversationId(id);
    }

    // POST - Create new message
    @PostMapping
    public Message createMessage(@RequestBody Message message) {
        message.setCreatedAt(LocalDateTime.now());
        message.setEdited(false); // default
        return messageRepository.save(message);
    }

    // PUT - Update message text
    @PutMapping("/{id}")
    public Message updateMessage(@PathVariable Long id, @RequestBody Message updatedMessage) {
        Message msg = messageRepository.findById(id).orElse(null);
        if (msg != null) {
            msg.setContent(updatedMessage.getContent());
            msg.setEdited(true);
            return messageRepository.save(msg);
        }
        return null;
    }

    // DELETE - Delete message
    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        messageRepository.deleteById(id);
    }
}
