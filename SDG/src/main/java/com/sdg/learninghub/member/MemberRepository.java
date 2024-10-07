package com.sdg.learninghub.member;

import com.sdg.learninghub.member.MemberEntity;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long>{
	
	Optional<MemberEntity> findByEmail(String email);
	Optional<MemberEntity> findByUsername(String username);
	Optional<MemberEntity> findByEmailAndProvider(String email, String provider);
}
