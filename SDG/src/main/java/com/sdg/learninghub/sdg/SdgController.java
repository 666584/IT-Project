package com.sdg.learninghub.sdg;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class SdgController {
    @Autowired
    private SdgService SdgService;

    @RequestMapping("/")
    public String viewHomePage(Model model, @Param("keyword") String keyword) {
        List<Sdg> listSdg = SdgService.listAll(keyword);
        model.addAttribute("listSdg", listSdg);
        model.addAttribute("keyword", keyword);
        return "index";
    }
}