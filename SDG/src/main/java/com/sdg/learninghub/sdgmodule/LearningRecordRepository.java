package com.sdg.learninghub.sdgmodule;

import java.util.Optional;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearningRecordRepository extends JpaRepository<LearningRecord, Long> {
	
	Optional<LearningRecord> findByUser_Userid(Long userId);
}
