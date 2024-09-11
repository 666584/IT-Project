package com.sdg.learninghub.sdg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SdgService {
    @Autowired
    private SdgRepository SdgRepository;

    public List<Sdg> listAll(String keyword) {
        if (keyword != null) {
            return SdgRepository.findAll(keyword);
        }
        return SdgRepository.findAll();
    }
}
