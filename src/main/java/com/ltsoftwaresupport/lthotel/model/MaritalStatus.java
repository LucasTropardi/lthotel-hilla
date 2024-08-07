package com.ltsoftwaresupport.lthotel.model;

public enum MaritalStatus {
    SINGLE("Solteiro"),
    MARRIED("Casado"),
    DIVORCED("Divorciado"),
    WIDOWED("Viúvo"),
    SEPARATED("Separado"),
    ENGAGED("Noivo"),
    RELATIONSHIP("Namorando"),
    CIVILUNION("União Civil");
	
	private String maritalStatus;
	
	MaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	
	public String getMaritalStatus() {
		return maritalStatus;
	}
	
	@Override
	public String toString() {
		return this.getMaritalStatus();
	}
}