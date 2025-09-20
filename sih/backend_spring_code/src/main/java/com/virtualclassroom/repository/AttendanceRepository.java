package com.virtualclassroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.virtualclassroom.model.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> { }
