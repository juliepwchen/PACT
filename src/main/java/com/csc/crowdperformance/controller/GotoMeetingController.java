/**
 * 
 */
package com.csc.crowdperformance.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.csc.crowdperformance.domain.Meeting;
import com.csc.crowdperformance.domain.CitrixMenuItem;
import com.csc.crowdperformance.service.GotoMeetingService;

/**
 * @author juliechen
 *
 */
@RestController
public class GotoMeetingController {
	
   private static AtomicInteger countAuthenticated = new AtomicInteger(0);
   private static AtomicInteger countLogin = new AtomicInteger(0);
	
   @Autowired
   private GotoMeetingService gotoMeetingService;

   @PreAuthorize("hasRole('ROLE_ADMIN')")
   @RequestMapping("/AuthenicateUser")
   public Map<String, String> isAuthenticated(
		   @RequestParam(value="username", defaultValue="") String username, 
		   @RequestParam(value="password", defaultValue="") String password)
   {
	   Map<String, String> isAuthenticated = new HashMap();

	   /*
	   if (countAuthenticated.intValue() ==2) {isAuthenticated.put("IsAuthenicated", "true"); countAuthenticated.getAndSet(0); }
	   isAuthenticated.put("IsAuthenicated", "false");
	   countAuthenticated.getAndIncrement(); */

	   if (username.equals("testuser@gmail.com".trim()) && password.equals("testuser".trim())) {

		   isAuthenticated.put("IsAuthenicated", "true");
	   }
	   else { isAuthenticated.put("IsAuthenicated", "false"); }

	   isAuthenticated.put("Username", username);
	   isAuthenticated.put("Password", password);
	 
       return isAuthenticated;
   }
   
   @RequestMapping("/gotomeeting")
   public ResponseEntity<Meeting[]> getAllMeetings(@RequestParam(value="username", defaultValue="") String username, @RequestParam(value="password", defaultValue="") String password)
   {
     return gotoMeetingService.getAllMeetings(username, password);
   }
   
   @RequestMapping("/gettime")
   public Map<String, String> getTimeSpentAtMeetings(
		   @RequestParam(value="username", defaultValue="") String username, 
		   @RequestParam(value="password", defaultValue="") String password,
		   @RequestParam(value="startDate", defaultValue="") String startDate,
		   @RequestParam(value="endDate", defaultValue="") String endDate)
   {
     return gotoMeetingService.getTimeSpentAtMeetings(username, password, startDate, endDate);

   } 
   
   @RequestMapping("/getdurations")
   public Map<String, String> getDurations(
		   @RequestParam(value="username", defaultValue="") String username, 
		   @RequestParam(value="password", defaultValue="") String password,
		   @RequestParam(value="startDate", defaultValue="") String startDate,
		   @RequestParam(value="endDate", defaultValue="") String endDate)
   {
     return gotoMeetingService.getDurations(username, password, startDate, endDate);

   } 
   
   
}
