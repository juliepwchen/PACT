package com.csc.crowdperformance.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
 
/**
 * @author juliechen
 *
 */
@JsonIgnoreProperties(ignoreUnknown=true)
@XmlRootElement(name = "menuItem")
public class CitrixMenuItem {
    
	private String Route;
	private String Description;
	
	public String getRoute() {
		return Route;
	}
	@XmlElement
	public void setRoute(String Route) {
		this.Route = Route;
	}
	
	public String getDescription() {
		return Description;
	}
	@XmlElement
	public void setDescription(String Description) {
		this.Description = Description;
	}

}
