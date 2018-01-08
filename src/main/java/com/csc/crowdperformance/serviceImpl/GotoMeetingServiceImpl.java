/**
 * 
 */
package com.csc.crowdperformance.serviceImpl;

//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.csc.crowdperformance.domain.Meeting;
import com.csc.crowdperformance.domain.Webinar;
import com.csc.crowdperformance.service.GotoMeetingService;

/**
 * @author juliechen
 *
 */
@Service
public class GotoMeetingServiceImpl implements GotoMeetingService {

	private static RestTemplate restTemplate = new RestTemplate();
	private static final String url = "https://api.citrixonline.com/G2M/rest/meetings?scheduled=true&";
	private static final String range = "startDate=2015-03-01T09:00:00Z&endDate=2015-04-30T09:00:00Z";
	private static final String oAuth = "OAuth oauth_token=leIYaVUGQff4fFCFKHsBq4fIl0Ll";
	private static SimpleDateFormat gtmformat = new SimpleDateFormat("EEE MMM  dd HH:mm:ss yyyy");		//startTime=Tue Mar  10 19:00:00 2015    endTime=Tue Mar  10 19:30:00 2015
	//private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss yyyy", Locale.ENGLISH);  //format: Tue Mar  10 06:00:00 2015
	
	private static final String urlWebinar = "https://api.citrixonline.com/G2W/rest/organizers/255145336807623941/upcomingWebinars";
	private static final String rangeWebinar = "fromTime=2015-03-01T09:00:00Z&toTime=2015-03-31T09:00:00Z";
	private static final String oAuthWebinar = "OAuth oauth_token=pbu0WAJapqRLP4VO2PS1bgrGMXBN";
	private static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'");		//startTime=2015-04-09T20:00:00Z    endTime=2015-04-09T23:00:00Z
	

	public ResponseEntity<Meeting[]> getAllMeetings(String username, String password) {

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", oAuth);
		HttpEntity<String> entity = new HttpEntity<String>(headers);

		ResponseEntity<Meeting[]> responseEntity = restTemplate.exchange(url+range, HttpMethod.GET, entity, Meeting[].class);
		
		return responseEntity;
	}
	
	public ResponseEntity<Webinar[]> getAllWebinars(String username, String password) {

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", oAuthWebinar);
		HttpEntity<String> entity = new HttpEntity<String>(headers);

		ResponseEntity<Webinar[]> responseEntity = restTemplate.exchange(urlWebinar, HttpMethod.GET, entity, Webinar[].class);
		
		return responseEntity;
	}

	public Meeting getMeeting(String meetingID, String username, String password) {
		Meeting meeting = restTemplate.getForObject(url+range, Meeting.class);
		return meeting;
	}
	
	public Map<String, String> getTimeSpentAtMeetings( String username, String password, String startDate, String endDate) {
		ResponseEntity<Meeting[]> meetings = getAllMeetings(username, password); 
		
		Meeting[] marray = meetings.getBody();
		Map<String, String> map = new HashMap();
		int hours=0;
		//LocalDateTime date1=null;
		//LocalDateTime date2 = null;
		for (Meeting m:marray) {
				
			//date1 = LocalDateTime.parse(m.getStartTime().replaceAll("\\s+", " "), formatter);
			//date2 = LocalDateTime.parse(m.getEndTime().replaceAll("\\s+", " "), formatter);
            
			//if (date1.getDayOfMonth() == date2.getDayOfMonth()) {
			  //hours = Math.round(((date2.getHour() * 60 + date2.getMinute()) - (date1.getHour() * 60 + date1.getMinute()))/60);
			//}
			map.put("id", String.valueOf(1));
			map.put("hour", String.valueOf(5));
			//map.put("hour", String.valueOf(date1.getHour()));
			//map.put("minutes", String.valueOf(date1.getMinute()));
			//map.put("day", String.valueOf(date1.getDayOfMonth()));
			
		}
		return map;
	}
	
	public Map <String, String> getDurations ( String username, String password, String startDate, String endDate) {
		Map<String, String> map = new HashMap();
		
		ResponseEntity<Webinar[]> webinars = getAllWebinars(username, password); 
		if (webinars == null) {map.put("webinarHours", "NULL"); return map;}
		Webinar[] warray = webinars.getBody();
		if ((warray == null)||(warray.length ==0)) {map.put("webinarHours", "No Element"); return map;}
		int totalWebinars =0;
		long diff=0;
		
		Date d1 = null;
	    Date d2 = null;
		for (Webinar w:warray) {
	      try {
	    	if (w == null) {map.put("webinarHours", "No Webinar="+ String.valueOf(totalWebinars)); return map;}
	    	if ((w.getTimes() == null) || (w.getTimes().length == 0)) {map.put("webinarHours", "No Time="+ String.valueOf(totalWebinars)); return map;}
	    	for (int i=0; i < w.getTimes().length; i++) {
	          d1 = format.parse(w.getTimes()[i].get("startTime"));
	          d2 = format.parse(w.getTimes()[i].get("endTime"));
	          if ((d2 == null) || (d1 ==null)) {map.put("webinarHours", "No Date="+ String.valueOf(totalWebinars)); return map;}
		      diff = d2.getTime() - d1.getTime();  //get msec
		      totalWebinars += Math.round(diff/(1000*60*60)); 	//convert to hours
	    	}
	      } catch (ParseException e) {
	        e.printStackTrace();
	      }	      
		}
		
		ResponseEntity<Meeting[]> meetings = getAllMeetings(username, password); 
		if (meetings == null) {map.put("meetingHours", "NULL"); return map;}
		Meeting[] marray = meetings.getBody();
		if ((marray == null)||(marray.length ==0)) {map.put("meetingHours", "No Element"); return map;}
		int totalMeetings =0;
		long diffGTM=0;
		
		Date dgtm1 = null;
	    Date dgtm2 = null;
	    //String time1 = null;
	    //String time2 = null;
		for (Meeting m:marray) {
	      try {
	    	if (m == null) {map.put("meetingHours", "No Meeting="+ String.valueOf(totalMeetings)); return map;}
	    	if ((m.getStartTime() == null) || (m.getEndTime() ==null)) {map.put("meetingHours", "No Time="+ String.valueOf(totalMeetings)); return map;}
	    	
	    	//time1 = m.getStartTime().trim().replaceAll("\\s", "-");
	    	//time2 = m.getEndTime().trim().replaceAll("\\s", "-");
	        dgtm1 = gtmformat.parse(m.getStartTime());
	        dgtm2 = gtmformat.parse(m.getEndTime());
	        if ((dgtm2 == null) || (dgtm1 ==null)) {map.put("meetingHours", "No Date="+ String.valueOf(totalMeetings)); return map;}
		    diffGTM = dgtm2.getTime() - dgtm1.getTime();  //get msec
		    //if (diffGTM > 0) {map.put("meetingHours", "diffGTM="+ String.valueOf(diffGTM)); return map;}
		    totalMeetings += Math.round(diffGTM/(1000*60*60)); 	//convert to hours
		    //if (totalMeetings > 0) {map.put("meetingHours", "totalMeetings="+ String.valueOf(totalMeetings)); return map;}
	    	
	      } catch (ParseException e) {
	        e.printStackTrace();
	      }	      
		}
		
		map.put("webinarHours", String.valueOf(totalWebinars));
		map.put("meetingHours", String.valueOf(totalMeetings));
		
		return map;	
	}

}
