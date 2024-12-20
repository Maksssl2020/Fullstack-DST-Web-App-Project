package com.dst.websiteprojectbackendspring.config;

import com.dst.websiteprojectbackendspring.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorization -> authorization.requestMatchers(
                                        "/api/v1/auth/**",
                                        "/api/v1/comments/**",
                                        "/api/v1/news/**",
                                        "/api/v1/forum/**",
                                        "/api/v1/home/posts/**",
                                        "/api/v1/products/**",
                                        "/api/v1/users/**",
                                        "/api/v1/articles/**",
                                        "/api/v1/shop/carts/**",
                                        "/api/v1/items/**",
                                        "/api/v1/instagram/**",
                                        "/api/v1/events/**",
                                        "/api/v1/notifications/**",
                                        "/api/v1/messages/**",
                                        "/api/v1/statistics/**",
                                        "/api/v1/shop/discount-codes/**",
                                        "/api/v1/payments/**",
                                        "/api/v1/orders/**",
                                        "/api/v1/orders/**",
                                        "/api/v1/requests-to-admin/**",
                                        "/api/v1/favourite-items/**"
                                ).permitAll()
                                .anyRequest()
                                .authenticated()
                )

                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .accessDeniedHandler(new AccessDeniedHandlerImpl())
                        .authenticationEntryPoint(restAuthenticationEntryPoint)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}