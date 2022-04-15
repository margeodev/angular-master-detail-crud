import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import toastr from "toastr";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittinForm: boolean = false;
  category: Category = new Category();

  constructor(
    private service: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {    
    this.submittinForm = true;
    if(this.currentAction == 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  //PRIVATE METHODS
  private setCurrentAction() {
    if(this.route.snapshot.url[0].path == 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }    
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.service.create(category)
    .subscribe(category => {
      this.actionsForSuccess();
    }, error => {
      this.actionsForError(error);
    });
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    
    this.service.update(category.id, category)
    .subscribe( 
      () => this.actionsForSuccess(),
      error => this.actionsForError(error));
  }

  private actionsForSuccess() {        
    toastr.success("Solicitação processada com sucesso!");
    this.router.navigate(['/categories']);
  }

  private actionsForError(error) {
    toastr.error("Ocorreu um erro ao processar sua solicitação", error.status);
    this.submittinForm = false;

  }

  private setPageTitle() {     
    if(this.currentAction == 'new') {
      this.pageTitle = 'Cadastro de nova Categoria';
    } else {
      const categoryName = this.category ? this.category.name : '';
      this.pageTitle = 'Editando categoria: ' + categoryName;
    }
  }
  
  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if(this.currentAction == 'edit') {
      this.route.paramMap.subscribe(params => {
        this.service.getById(params.get('id')).subscribe(response => {
          this.category = response;          
          this.categoryForm.patchValue(this.category);
        }, () => toastr.error("Erro no servidor."));
      })
    }
  }

}
