package com.sdg.learninghub.sdg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SdgService {
    @Autowired
    private SdgRepository sdgRepository;

    public List<Sdg> listAll(String keyword) {
        if (keyword != null) {
            return sdgRepository.findAll(keyword);
        }
        return sdgRepository.findAll();
    }
    
    public Sdg getGoal(String title) {
    	Optional<Sdg> goals = sdgRepository.findByTitle(title);
    	
    	if(goals == null) {
    		return null;
    	}

    	return  goals.get();
    }
}
