package org.corehound.idemo;

import org.corehound.idemo.domain.City;
import org.corehound.idemo.domain.CityRepository;
import org.corehound.idemo.domain.MeetingRoom;
import org.corehound.idemo.domain.MeetingRoomRepository;
import org.corehound.idemo.domain.ReservationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.github.ulisesbocchio.spring.boot.security.saml.annotation.EnableSAMLSSO;
import com.github.ulisesbocchio.spring.boot.security.saml.configurer.ServiceProviderBuilder;
import com.github.ulisesbocchio.spring.boot.security.saml.configurer.ServiceProviderConfigurerAdapter;

@SpringBootApplication
@EnableSAMLSSO
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
			
//			Reservation jirkovaRezervace = new Reservation();
//			jirkovaRezervace.setUser("jirka");
//			jirkovaRezervace.setRoom(mountEverest);
//			
//			reservationRepository.save(jirkovaRezervace);
			
		};
	}	
	
    @Configuration
    public static class IdemoServiceProviderConfig extends ServiceProviderConfigurerAdapter {

        @Override
        public void configure(ServiceProviderBuilder serviceProvider) throws Exception {

            serviceProvider
                .metadataGenerator()
//                .entityId("login-test")
                .entityId("localhost-demo")
            .and()
                .sso()
                .defaultSuccessURL("/home")
            .and()
                .logout()
                .defaultTargetURL("/")
            .and()
                .metadataManager()
//                .metadataLocations("classpath:/idp-innogy.xml")
                .metadataLocations("classpath:/idp-ssocircle-new.xml")
                .refreshCheckInterval(0)
            .and()
                .extendedMetadata()
                .idpDiscoveryEnabled(false)
            .and()
                .keyManager()
                .privateKeyDERLocation("classpath:/localhost.key.der")
                .publicKeyPEMLocation("classpath:/localhost.cert")
            .and()
                .samlContextProviderLb()
                .scheme("http")
                .contextPath("/")
                .serverName("localhost")
                .serverPort(8080)
                .includeServerPortInRequestURL(true);

        }
    }
}
