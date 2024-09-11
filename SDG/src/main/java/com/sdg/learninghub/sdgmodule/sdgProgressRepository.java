package com.sdg.learninghub.sdgmodule;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface sdgProgressRepository extends JpaRepository<sdgProgress, Long>{
	List<sdgProgress> findByMemberId(Long user_id);
}
