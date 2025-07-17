//package com.hexaware.QuitQ.config;
//
//
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.config.Customizer;
//
//@Configuration
//public class SecurityConfig {
//	
//	
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//            .authorizeHttpRequests(auth -> auth
//                .anyRequest().permitAll() 
//            )
//            .oauth2Login(oauth2 -> oauth2
//                .loginPage("/loginPage") 
//                .defaultSuccessUrl("/usercategory", true) 
//            )
//            .logout(logout -> logout
//                .logoutSuccessUrl("/loginPage").permitAll()
//            )
//            .csrf(csrf -> csrf.disable()); 
//
//        return http.build();
//    }
//}
//
package com.hexaware.QuitQ.config;

import com.hexaware.QuitQ.service.UserDetailsServiceImpl;
import com.hexaware.QuitQ.config.JwtFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        .cors() // ✅ enable cors
        .and()
        .csrf(csrf -> csrf.disable())
        .exceptionHandling(exception -> exception
                .authenticationEntryPoint(restAuthenticationEntryPoint())  // Return 401
            )
            .authorizeHttpRequests(auth -> auth
            			    .requestMatchers(
            			        "/api/users/**",
            			        "/api/users/login",
            			        "/api/users/forgot-password",
            			        "/oauth2/**"
            			    ).permitAll()


                // ✅ Sellers & Admins can view categories
                .requestMatchers(HttpMethod.GET, "/api/categories/**").hasAnyRole("ADMIN", "SELLER","CUSTOMER")
                .requestMatchers(HttpMethod.GET, "/api/products/**").hasAnyRole("SELLER","CUSTOMER","ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/products/**").hasAnyRole("SELLER","CUSTOMER","ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/products/seller/**").hasAnyRole("SELLER")



                // ✅ Only Admin can add/update/delete categories
                .requestMatchers(HttpMethod.POST, "/api/categories/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/categories/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/categories/**").hasRole("ADMIN")

                .requestMatchers("/api/products/**").hasAnyRole("SELLER","ADMIN")
//                .requestMatchers("/api/finalorders/**").hasAnyRole("SELLER")
//                .requestMatchers("/api/finalorders/**").hasAnyRole("ADMIN")
                .requestMatchers("/api/finalorders/**").hasAnyRole("SELLER", "ADMIN","CUSTOMER")
                
//                .requestMatchers("/api/reviews/**").hasRole("ADMIN")


                .requestMatchers("/api/reviews/**").hasAnyRole("ADMIN","SELLER","CUSTOMER")




                .requestMatchers("/api/cart/**","/api/finalorders/**","/api/wishlist").hasAnyRole("CUSTOMER","ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/finalorders/**").hasAnyRole("CUSTOMER")
//                .requestMatchers(HttpMethod.GET, "/api/finalorders/**").hasAnyRole("ADMIN")



              
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .oauth2Login(oauth2 -> oauth2
        	    .successHandler(oAuth2SuccessHandler())  // ✅ your custom logic
        	);

                  

        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    
    @Bean
    public AuthenticationSuccessHandler oAuth2SuccessHandler() {
        return (request, response, authentication) -> {
            String email = authentication.getName(); // email from Google
            // Optional: Check if this email exists in your DB before using

            // Store email in session (or JWT or as redirect param)
            request.getSession().setAttribute("oauthEmail", email);

            // ✅ Redirect to React with email as query param
            response.sendRedirect("http://localhost:3000/oauth-success?email=" + email);
        };
    }
    
    @Bean
    public AuthenticationEntryPoint restAuthenticationEntryPoint() {
        return new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED);  // this avoids redirect to Google
    }

}
