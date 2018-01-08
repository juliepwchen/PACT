/**
 * 
 */
package com.csc.crowdperformance.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
/**
 * @author juliechen
 *
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@XmlRootElement(name = "meeting")
public class Meeting {
    
	private String meetingId;
	private String startTime;
	private String endTime;
	
	public String getStartTime() {
		return startTime;
	}
	@XmlElement
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	
	public String getEndTime() {
		return endTime;
	}
	@XmlElement
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	public String getMeetingId() {
		return meetingId;
	}
	@XmlElement
	public void setMeetingId(String meetingId) {
		this.meetingId = meetingId;
	}

}
