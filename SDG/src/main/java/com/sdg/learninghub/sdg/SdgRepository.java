package com.sdg.learninghub.sdg;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SdgRepository extends JpaRepository<Sdg, Integer>{
    @Query("SELECT s From Sdg s WHERE CONCAT(s.id, '',s.title, ' ', s.content, ' ') LIKE %?1%")
    List<Sdg> findAll(String keyword);
    List<Sdg> findAll();
    Optional<Sdg> findByTitle(String title);
}
