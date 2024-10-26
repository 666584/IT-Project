package com.sdg.learninghub.member.mapper;

import java.util.Optional;

import com.sdg.learninghub.member.MemberEntity;
import com.sdg.learninghub.member.Provider;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {

    Optional<MemberEntity> findById(@Param("userid") Long userid);

    Optional<MemberEntity> findByEmail(@Param("email") String email);

    Optional<MemberEntity> findByUsername(@Param("username") String username);

    Optional<MemberEntity> findByEmailAndProvider(@Param("email") String email, @Param("provider") Provider provider);
    
    int addMember(MemberEntity member);
}
