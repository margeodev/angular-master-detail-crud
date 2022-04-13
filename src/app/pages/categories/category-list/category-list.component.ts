import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import toastr from "toastr";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private service: CategoryService
    ) { }

  ngOnInit(): void {
    this.getCategories();    
  }

  getCategories(): void {
    this.service.getAll().subscribe(response => {
      this.categories = response;
    }, (error) => {
      toastr.error("Erro ao listar categorias")
    }); 
  }

  deleteCategory(category) {
    const confirmDelete = confirm('Deseja realmente excluir este item?');
    if(confirmDelete) {
      this.service.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(element => element != category),
        () => toastr.error("Erro ao tentar excluir!")
      );
    }
  }
}
