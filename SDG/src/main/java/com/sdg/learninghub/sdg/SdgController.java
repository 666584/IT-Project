package com.sdg.learninghub.sdg;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/goal")
public class SdgController {

    private final SdgRepository sdgRepository;
    
    @GetMapping("/list")
    public String list(Model model) {
    	List<Sdg> goalList = this.sdgRepository.findAll();
    	model.addAttribute("goalList", goalList);
    	return "goal_list";
    }

}