package org.corehound.idemo.domain;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "room", path = "room")
public interface MeetingRoomRepository extends PagingAndSortingRepository<MeetingRoom, Long> {
	
	List<MeetingRoom> findByCityId(@Param("cityId") String cityId);
}
