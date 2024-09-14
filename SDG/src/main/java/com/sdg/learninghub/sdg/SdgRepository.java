package com.sdg.learninghub.sdg;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SdgRepository extends JpaRepository<Sdg, Integer>{
    @Query("SELECT s From Sdg s WHERE CONCAT(s.goal_id, '',s.title, ' ', s.content, ' ') LIKE %?1%")
    List<Sdg> search(String keyword);
}