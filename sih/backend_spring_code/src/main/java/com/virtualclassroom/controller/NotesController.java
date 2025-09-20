package com.virtualclassroom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.virtualclassroom.model.Note;
import com.virtualclassroom.repository.NoteRepository;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NotesController {
    @Autowired
    private NoteRepository repo;

    @PostMapping
    public Note addNote(@RequestBody Note note) {
        return repo.save(note);
    }

    @GetMapping
    public List<Note> getNotes() {
        return repo.findAll();
    }
}
