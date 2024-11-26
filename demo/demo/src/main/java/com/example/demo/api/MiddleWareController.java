package com.example.demo.api;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
public class MiddleWareController implements MiddleWareApi {

    private final String answersApiUrl = "https://rori-answers-api-iadgvfgdkq-ew.a.run.app/v2/nlu";

    @Override
    public ResponseEntity<?> getAnswer(MessageDataDTO payload) {
        log.info("payload {}", payload);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Forward request to the answers API
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<MessageDataDTO> requestEntity = new HttpEntity<>(payload, headers);

            log.info("requestEntity {}", requestEntity);

            ResponseEntity<Map> responseEntity = restTemplate.exchange(
                    answersApiUrl,
                    HttpMethod.POST,
                    requestEntity,
                    Map.class
            );

            // Return the response to the frontend
            return ResponseEntity.ok(responseEntity.getBody());

        } catch (Exception ex) {
            // Handle errors, log details
            ex.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to connect to answers API.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
