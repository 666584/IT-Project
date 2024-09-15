package com.sdg.learninghub.member.jwt;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sdg.learninghub.member.MemberEntity;

@Repository
public interface AuthRepository extends JpaRepository<Auth, Long>{
	Boolean existsByUser(MemberEntity user);
	Optional<Auth> findByRefreshToken(String refreshToken);
	Optional<Auth> findByAccessToken(String accessToken);
}
