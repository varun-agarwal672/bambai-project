package com.example.demo.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class MessageDataDTO {

    @JsonProperty("author_id")
    private String authorId;

    @JsonProperty("author_type")
    private String authorType;

    @JsonProperty("contact_uuid")
    private String contactUuid;

    @JsonProperty("expected_answer")
    private String expectedAnswer;

    @JsonProperty("message_body")
    private String messageBody;

    @JsonProperty("message_direction")
    private String messageDirection;

    @JsonProperty("message_id")
    private String messageId;

    @JsonProperty("message_inserted_at")
    private ZonedDateTime messageInsertedAt;

    @JsonProperty("message_updated_at")
    private ZonedDateTime messageUpdatedAt;

    @JsonProperty("question")
    private String question;
}
