import { Component, OnInit } from '@angular/core';
import { Entry } from '../model/entry.model';
import { EntryService } from '../service/entry.service';
import toastr from "toastr";

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];

  constructor(
    private service: EntryService
    ) { }

  ngOnInit(): void {
    this.getEntries();    
  }

  getEntries(): void {
    this.service.getAll().subscribe(response => {
      response.forEach(e => {
        const entry = Object.assign(new Entry(), e);
        this.entries.push(entry);
      });      
    }, 
    (error) => toastr.error("Erro ao listar lançamentos"));  
  }

  deleteEntry(entry) {
    const confirmDelete = confirm('Deseja realmente excluir este item?');
    if(confirmDelete) {
      this.service.delete(entry.id).subscribe(
        () => this.entries = this.entries.filter(element => element != entry),
        () => toastr.error("Erro ao tentar excluir!")
      );
    }
  }
}
