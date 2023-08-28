// app.component.ts
import { Component, OnInit } from '@angular/core';
import { Note } from './note.model';
import { NotesService } from './notes.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myFormControl = new FormControl();
  title = 'keep notes';
  newNote: Note = { id: 0, title: '', text: '' };
  notes: Note[] = [];
  errMessage: string = '';

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.fetchNotes();
  }


  fetchNotes() {
    this.notesService.getNotes().subscribe(
      (notes) => {
        this.notes = notes;
      },
      (error) => {
        this.errMessage = 'Error fetching notes';
      }
    );
  }

  addNote() {
    if (this.newNote.title && this.newNote.text) {
      this.notesService.addNote(this.newNote).subscribe(
        () => {
          this.notes.push(this.newNote);
          this.fetchNotes(); 
          this.newNote = { id: 0, title: '', text: '' };
        },
        (error) => {
          this.errMessage = 'Error adding note';
        }
      );
    }
  }

 
}


