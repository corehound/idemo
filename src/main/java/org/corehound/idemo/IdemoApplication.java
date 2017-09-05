package org.corehound.idemo;

import javax.swing.JInternalFrame;

import org.corehound.idemo.domain.City;
import org.corehound.idemo.domain.CityRepository;
import org.corehound.idemo.domain.MeetingRoom;
import org.corehound.idemo.domain.MeetingRoomRepository;
import org.corehound.idemo.domain.Reservation;
import org.corehound.idemo.domain.ReservationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class IdemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(IdemoApplication.class, args);
	}
	
	@Bean
	public CommandLineRunner demo(CityRepository cityRepository, MeetingRoomRepository meetingRoomRepository, ReservationRepository reservationRepository) {
		return (args) -> {
			City praha = cityRepository.save(new City("Praha"));
			City brno = cityRepository.save(new City("Brno"));
			City plzen = cityRepository.save(new City("Plzen"));
			
			MeetingRoom mountEverest = meetingRoomRepository.save(new MeetingRoom("Mount Everest",praha));
			meetingRoomRepository.save(new MeetingRoom("K2",praha));
			meetingRoomRepository.save(new MeetingRoom("Kančendženga",praha));
			
			meetingRoomRepository.save(new MeetingRoom("Lhoce",brno));
			meetingRoomRepository.save(new MeetingRoom("Makalu",brno));
			meetingRoomRepository.save(new MeetingRoom("Čo Oju",brno));
			
			meetingRoomRepository.save(new MeetingRoom("Dhaulágirí",plzen));
			meetingRoomRepository.save(new MeetingRoom("Manáslu",plzen));
			meetingRoomRepository.save(new MeetingRoom("Nanga Parbat",plzen));
			
			Reservation jirkovaRezervace = new Reservation();
			jirkovaRezervace.setUser("jirka");
			jirkovaRezervace.setRoom(mountEverest);
			
			reservationRepository.save(jirkovaRezervace);
			
		};
	}
}
