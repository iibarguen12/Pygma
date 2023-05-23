package com.pygma.authservice.config;

import com.pygma.authservice.filter.JwtFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean jwtFilter() {
        FilterRegistrationBean<JwtFilter> filter= new FilterRegistrationBean();
        filter.setFilter(new JwtFilter());
        return filter;
    }
}

