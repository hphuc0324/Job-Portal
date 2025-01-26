package com.example.backend.exception;

import com.example.backend.response.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ResponseObject> runtimeExceptionHandler(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ResponseObject.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .build()
        );
    }

    @ExceptionHandler(DataNotFoundException.class)
    public ResponseEntity<ResponseObject> handleDataNotFoundException(DataNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                ResponseObject.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.NOT_FOUND)
                        .build()
        );
    }

    @ExceptionHandler(WrongCredentialsException.class)
    public ResponseEntity<ResponseObject> handleWrongCredentials(WrongCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ResponseObject.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.UNAUTHORIZED)
                        .build()
        );
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ResponseObject> handleBadRequest(WrongCredentialsException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ResponseObject.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.BAD_REQUEST)
                        .build()
        );
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ResponseObject> handleEmailAlreadyExists(WrongCredentialsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                ResponseObject.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.CONFLICT)
                        .build()
        );
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<ResponseObject> handleUnauthorized(WrongCredentialsException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ResponseObject.builder()
                        .message(e.getMessage())
                        .status(HttpStatus.UNAUTHORIZED)
                        .build()
        );
    }
}
