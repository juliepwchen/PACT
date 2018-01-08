package com.csc.crowdperformance.serviceImpl;

import org.springframework.web.client.RestTemplate;

/**
 * Created by juliechen on 6/29/15.
 */
public class OCRServiceImpl {

    private static RestTemplate restTemplate = new RestTemplate();
    private static final String license_code = "juliepwchen";
    private static final String user_name = "61AC92F2-6292-4592-993E-EEE6BA8BAAFC";

    // Extraction text with English language
    String ocrURL = "http://www.ocrwebservice.com/restservices/processDocument?gettext=true";

    // Convert first 5 pages of multipage document into doc and txt
    // ocrURL = "http://www.ocrwebservice.com/restservices/processDocument?language=english&pagerange=1-5&outputformat=doc,txt";

    // Full path to uploaded document
    String filePath = "C:\\sample_image.jpg";



}
