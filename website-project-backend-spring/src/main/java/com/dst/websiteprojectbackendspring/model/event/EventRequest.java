package com.dst.websiteprojectbackendspring.model.event;

import java.time.LocalDateTime;
import java.util.List;


public record EventRequest(String title, String description, LocalDateTime eventDate, LocalDateTime registrationEndDate, List<String> tasks) {

}