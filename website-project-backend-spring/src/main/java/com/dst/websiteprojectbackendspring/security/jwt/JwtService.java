package com.dst.websiteprojectbackendspring.security.jwt;

import com.dst.websiteprojectbackendspring.service.email.EmailServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.jackson.io.JacksonSerializer;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${security.jwt.expiration}")
    private long JWT_EXPIRATION;

    @Value("${security.jwt.secret-key}")
    private String SECRET_KEY;

    private final ObjectMapper objectMapper;
    private final EmailServiceImpl emailService;

    public String generateJwtToken(UserDetails userDetails) {
        return generateJwtToken(new HashMap<>(), userDetails);
    }

    public String generateJwtToken(HashMap<String, Object> claims, UserDetails userDetails) {

        return buildJwtToken(claims, userDetails, JWT_EXPIRATION);
    }

    private String buildJwtToken(
            HashMap<String, Object> claims,
            UserDetails userDetails,
            long jwtExpiration
    ) {
        var authorities = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        Date issuedAtDate = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(issuedAtDate.getTime() + jwtExpiration);
        return Jwts
                .builder()
                .setClaims(claims)
                .serializeToJsonWith(new JacksonSerializer<>(objectMapper))
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedAtDate)
                .setExpiration(expirationDate)
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
        return extractClaim(token).getExpiration();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String jwtToken) {
        return extractClaim(jwtToken).getSubject();
    }

    public Claims extractClaim(String jwtToken) {
        return Jwts.parser()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwtToken)
                .getBody();
    }
}
