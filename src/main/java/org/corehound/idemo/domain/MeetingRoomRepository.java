package org.corehound.idemo.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "room", path = "room")
public interface MeetingRoomRepository extends CrudRepository<MeetingRoom, Long> {}
