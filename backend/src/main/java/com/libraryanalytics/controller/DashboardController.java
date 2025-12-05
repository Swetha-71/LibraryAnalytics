package com.libraryanalytics.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardController {

    @GetMapping({"/", "/dashboard"})
    public String dashboard(Model model) {
        // The frontend React app will serve UI, but keep Thymeleaf templates for server-side pages
        model.addAttribute("appName", "Library Analytics");
        return "dashboard";
    }

    @GetMapping("/analytics")
    public String analytics() {
        return "analytics";
    }

    @GetMapping("/alerts")
    public String alerts() {
        return "alerts";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }
}
