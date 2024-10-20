package com.sdg.learninghub.sdg;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SdgInit implements ApplicationRunner{
	
	private final SdgRepository sdgRepository;
	
    @Override
    public void run(ApplicationArguments args) throws Exception {
    	if(sdgRepository.count() == 0) {
    		List<Sdg> goals = Arrays.asList(
    				new Sdg(1L, "No Poverty"),
    				new Sdg(2L, "Zero Hunger"),
    				new Sdg(3L, "Good Health"),
    				new Sdg(4L, "Quality Education"),
    				new Sdg(5L, "Gender Equality"),
    				new Sdg(6L, "Clean Water"),
    				new Sdg(7L, "Affordable Energy"),
    				new Sdg(8L, "Decent Work")
    		);
    		sdgRepository.saveAll(goals);
    	}
    }
}
