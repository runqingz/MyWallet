package com.runz.pmtool.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.runz.pmtool.domain.User;
import static com.runz.pmtool.security.SecurityConstants.EXPIRARION_TIME;
import static com.runz.pmtool.security.SecurityConstants.SECRET;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtProvider {
    
    public String generateToken(Authentication auth) {
        User user = (User)auth.getPrincipal();
        Date now = new Date();
        Date expirDate = new Date(now.getTime() + EXPIRARION_TIME);

        String userId = Long.toString(user.getId());
        Map<String, Object> claimsMap = new HashMap<>();
        claimsMap.put("id", userId);
        claimsMap.put("username", user.getUsername());
        claimsMap.put("firstname", user.getFirstName());
        claimsMap.put("lastname", user.getLastName());
        //Put role here for user management

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claimsMap)
                .setIssuedAt(now)
                .setExpiration(expirDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    public Boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
            return true;
        } catch (SignatureException e) {
            System.out.println("Invalid signature");
        } catch (MalformedJwtException e) {
            System.out.println("Invalid token");
        } catch (ExpiredJwtException e) {
            System.out.println("Expired token");
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported token");
        } catch (IllegalArgumentException e) {
            System.out.println("Illegal Arguments");
        }
        return false;
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");

        return Long.parseLong(id);
    }
}