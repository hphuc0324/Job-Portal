package com.example.backend.response;

import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class ResponseObject {
    private String message;
    private Object data;
    private HttpStatus status;
}
