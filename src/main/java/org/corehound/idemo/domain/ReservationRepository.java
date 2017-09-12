package org.corehound.idemo.domain;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.format.annotation.DateTimeFormat;

@RepositoryRestResource(collectionResourceRel = "reservation", path = "reservation")
public interface ReservationRepository extends CrudRepository<Reservation, Long> {
	
	List<Reservation> findByUser(@Param("user") String user);	
	
	List<Reservation> findByDateAndRoomId(@DateTimeFormat(pattern = "yyyy-MM-dd") @Param("date") Date date, @Param("roomid") Long roomId);	
	
	
}
