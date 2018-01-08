/**
 * 
 */
package com.csc.crowdperformance.domain;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
/**
 * @author juliechen
 *
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@XmlRootElement(name = "meeting")
public class Webinar {
    
	private String webinarKey;
	private Map<String, String> [] times;
	
	public Map<String, String> [] getTimes() {
		return times;
	}
	@XmlElement
	public void setStartTime(Map<String, String> [] times) {
		this.times = times;
	}
	
	public String getWebinarKey() {
		return webinarKey;
	}
	@XmlElement
	public void setMeetingId(String webinarKey) {
		this.webinarKey = webinarKey;
	}

}
