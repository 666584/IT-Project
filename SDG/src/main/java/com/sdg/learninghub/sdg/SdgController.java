package com.sdg.learninghub.sdg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sdg.learninghub.member.MemberService;

import java.util.List;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
@RequestMapping("/goal")
public class SdgController {
    @Autowired
    private SdgService SdgService;
    
    private final SdgRepository sdgRepository;
    
    @GetMapping("/list")
    public String list(Model model) {
    	List<Sdg> goalList = this.sdgRepository.findAll();
    	model.addAttribute("goalList", goalList);
    	return "goal_list";
    }
    /**
     * This code has error.
    @RequestMapping("/")
    public String viewHomePage(Model model, @Param("keyword") String keyword) {
        List<Sdg> listSdg = SdgService.listAll(keyword);
        model.addAttribute("listSdg", listSdg);
        model.addAttribute("keyword", keyword);

        return "index";
    }*/
}