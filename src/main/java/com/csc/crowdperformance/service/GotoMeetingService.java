/**
 * 
 */
package com.csc.crowdperformance.service;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import com.csc.crowdperformance.domain.Meeting;
import com.csc.crowdperformance.domain.Webinar;

/**
 * @author juliechen
 *
 */
public interface GotoMeetingService {
	
	ResponseEntity<Meeting[]> getAllMeetings(String username, String password);
	ResponseEntity<Webinar[]> getAllWebinars(String username, String password);
    Meeting getMeeting(String meetingID, String username, String password);
    Map<String, String> getTimeSpentAtMeetings(String username, String password, String startDate, String endDate);
    Map <String, String> getDurations ( String username, String password, String startDate, String endDate);
}
