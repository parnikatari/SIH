package com.virtualclassroom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.virtualclassroom.model.Note;

public interface NoteRepository extends JpaRepository<Note, Long> { }
