package com.devfreela.security;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserPrincipal {
    private String email;
    private Long userId;
    private String role;
}
