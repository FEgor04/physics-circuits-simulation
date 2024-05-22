package org.circuisim.exception;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.boot.json.JsonParseException;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.Date;


@ControllerAdvice
@ResponseBody
public class ControllerExceptionHandler {

    private final String VALIDATION_EXCEPTION = "Validation exception";
    private final String INVALID_INPUT_EXCEPTION = "Invalid input";
    private final String NOT_FOUND_EXCEPTION = "Not found";
    private final String UNAUTHORIZED_EXCEPTION = "Invalid password, email or JWT token!";
    private final String ACCESS_DENIED = "You do not have permission!";

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorMessage> resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.NOT_FOUND.value(), new Date(), NOT_FOUND_EXCEPTION, ex.getMessage());

        return new ResponseEntity<ErrorMessage>(message, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorMessage> methodArgumentNotValidException(Exception ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.UNPROCESSABLE_ENTITY.value(), new Date(), VALIDATION_EXCEPTION, ex.getMessage());

        return new ResponseEntity<ErrorMessage>(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(value = {JsonParseException.class, HttpMessageNotReadableException.class, IllegalArgumentException.class,
            InvalidDataAccessApiUsageException.class, MethodArgumentTypeMismatchException.class, ConstraintViolationException.class})
    public ResponseEntity<ErrorMessage> jsonParseException(Exception ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.BAD_REQUEST.value(), new Date(), INVALID_INPUT_EXCEPTION, ex.getMessage());

        return new ResponseEntity<ErrorMessage>(message, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {BadCredentialsException.class, io.jsonwebtoken.security.SignatureException.class,
            MalformedJwtException.class, ExpiredJwtException.class})
    public ResponseEntity<ErrorMessage> badCredentialsException(Exception ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.UNAUTHORIZED.value(), new Date(), UNAUTHORIZED_EXCEPTION, ex.getMessage());

        return new ResponseEntity<ErrorMessage>(message, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(value = {IllegalStateException.class})
    public ResponseEntity<ErrorMessage> illegalStateExceptionHandler(Exception ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.CONFLICT.value(), new Date(), request.getDescription(false), ex.getMessage());

        return new ResponseEntity<ErrorMessage>(message, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = {AccessDeniedException.class})
    public ResponseEntity<ErrorMessage> accessDeniedExceptionHandler(Exception ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.FORBIDDEN.value(), new Date(), ACCESS_DENIED, ex.getMessage());

        return new ResponseEntity<ErrorMessage>(message, HttpStatus.FORBIDDEN);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorMessage> globalExceptionHandler(Exception ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR.value(), new Date(), request.getDescription(false), ex.getMessage());
        return new ResponseEntity<ErrorMessage>(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}