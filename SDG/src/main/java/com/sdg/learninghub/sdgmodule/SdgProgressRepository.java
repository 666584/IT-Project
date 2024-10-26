package com.sdg.learninghub.sdgmodule;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SdgProgressRepository extends JpaRepository<SdgProgress, Long>{
	
	List<SdgProgress> findByMemberUserid(Long memberId);
	
	Optional<SdgProgress> findByMemberUseridAndGoalId(Long memberId, Long goalId);
}
