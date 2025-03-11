package com.example.backend.annotation;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface IsJobOwner {
    String idParam() default "slug";
}
