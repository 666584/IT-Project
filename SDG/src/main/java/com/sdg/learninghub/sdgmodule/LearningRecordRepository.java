package com.sdg.learninghub.sdgmodule;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningRecordRepository extends JpaRepository<LearningRecord, Long> {
	Optional<LearningRecord> findByUserId(Long userId);
}
