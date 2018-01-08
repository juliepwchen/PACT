package com.csc.crowdperformance.configuration;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;
 
public class CSCInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

        @Override
        protected Class<?>[] getRootConfigClasses() {
            return new Class[] {CSCSecurityConfig.class, CSCHibernateConfig.class};
        }

        @Override
        protected Class<?>[] getServletConfigClasses() {
            return new Class[] {CSCMvcConfig.class};
        }

        @Override
        protected String[] getServletMappings() {
            return new String[]{"/"};
        }

}
