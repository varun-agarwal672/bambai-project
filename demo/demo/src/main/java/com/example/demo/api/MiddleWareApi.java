package com.example.demo.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(value = "*")
@RequestMapping(value = "/api")
public interface MiddleWareApi {

    @PostMapping(value = "/validate-answer")
    ResponseEntity<?> getAnswer(@RequestBody MessageDataDTO payload);
}
