package com.sdg.learninghub.sdgmodule;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SdgProgressRepository extends JpaRepository<SdgProgress, Long>{
	List<SdgProgress> findByMemberId(Long memberId);
	Optional<SdgProgress> findByMemberIdAndGoalId(Long memberId, Long goalId);
}
