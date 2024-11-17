package com.dst.websiteprojectbackendspring.security.jwt;

import com.dst.websiteprojectbackendspring.handler.JwtTokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.jackson.io.JacksonSerializer;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${security.jwt.expiration}")
    private long JWT_EXPIRATION;

    @Value("${security.jwt.secret-key}")
    private String SECRET_KEY;

    @Value("${security.jwt.refresh-token-expiration}")
    private long JWT_REFRESH_TOKEN_EXPIRATION;


    private final ObjectMapper objectMapper;

    public String generateJwtToken(UserDetails userDetails) {
        return generateJwtToken(new HashMap<>(), userDetails);
    }

    public String generateJwtToken(HashMap<String, Object> claims, UserDetails userDetails) {

        return buildJwtToken(claims, userDetails, JWT_EXPIRATION);
    }

    public String generateRefreshJwtToken(UserDetails userDetails) {
        return buildJwtToken(new HashMap<>(), userDetails, JWT_REFRESH_TOKEN_EXPIRATION);
    }

    private String buildJwtToken(
            HashMap<String, Object> claims,
            UserDetails userDetails,
            long expiration
    ) {
        var authorities = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        Date issuedAtDate = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(issuedAtDate.getTime() + expiration);
        return Jwts
                .builder()
                .claims(claims)
                .json(new JacksonSerializer<>(objectMapper))
                .subject(userDetails.getUsername())
                .issuedAt(issuedAtDate)
                .expiration(expirationDate)
                .claim("authorities", authorities)
                .signWith(getSignInKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaims(token).getExpiration();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String jwtToken) {
        return extractClaims(jwtToken).getSubject();
    }

    public Claims extractClaims(String jwtToken) {
        try {
            return Jwts.parser()
                    .verifyWith(getSignInKey())
                    .build()
                    .parseSignedClaims(jwtToken)
                    .getPayload();
        } catch (ExpiredJwtException exception) {
            throw new JwtTokenExpiredException("JWT token expired!");
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }
}
