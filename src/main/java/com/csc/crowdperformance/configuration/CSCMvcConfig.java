package com.csc.crowdperformance.configuration;


import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

/* Scans for annotated @Controllers in the classpath
<context:component-scan base-package="org.test.web" use-default-filters="false">
<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
*/
@Configuration
@EnableWebMvc
@EnableGlobalMethodSecurity(prePostEnabled = true)
//@EnableAspectJAutoProxy(proxyTargetClass = true)
@ComponentScan(
        includeFilters = @ComponentScan.Filter(type= FilterType.ANNOTATION, value={org.springframework.stereotype.Controller.class}),
        basePackages = {
                "com.csc.crowdperformance"
        }
)
public class CSCMvcConfig extends WebMvcConfigurerAdapter{


        /* @Bean
        public ViewResolver getViewResolver(){
                InternalResourceViewResolver resolver = new InternalResourceViewResolver();
                resolver.setPrefix("/WEB-INF/views/");
                resolver.setSuffix(".html");
                return resolver;
        } */

        /*
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
                registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/META-INF/resources/webjars/").setCachePeriod(31556926);
                registry.addResourceHandler("/css/**").addResourceLocations("/css/").setCachePeriod(31556926);
                registry.addResourceHandler("/img/**").addResourceLocations("/img/").setCachePeriod(31556926);
                registry.addResourceHandler("/js/**").addResourceLocations("/js/").setCachePeriod(31556926);
        } */

        /* <mvc:resources mapping="/resources/**" location="/resources/" cache-period="31556926"/>
        *  <resources mapping="/resources/**" location="src/main/webapp/WEB-INF/resources" />
        *  Serve these resources with a 1-year future expiration to ensure maximum use of the browser cache
        *  and a reduction in HTTP requests made by the browser
        */
        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
                //registry.addResourceHandler("/static/**").addResourceLocations("/static/").setCachePeriod(31556926);
                registry.addResourceHandler("/**").addResourceLocations("/").setCachePeriod(31556926);

        }

        /*
        @Override
        public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
                configurer.enable();
        } */

}
