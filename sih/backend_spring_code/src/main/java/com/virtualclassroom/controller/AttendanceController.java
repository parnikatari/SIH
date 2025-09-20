package com.virtualclassroom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.virtualclassroom.model.Attendance;
import com.virtualclassroom.repository.AttendanceRepository;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {
    @Autowired
    private AttendanceRepository repo;

    @PostMapping
    public Attendance markAttendance(@RequestBody Attendance att) {
        return repo.save(att);
    }

    @GetMapping
    public List<Attendance> getAll() {
        return repo.findAll();
    }
}
