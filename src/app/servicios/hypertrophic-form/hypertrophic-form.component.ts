import { Component, OnInit } from '@angular/core';
import { HypertrophicService } from '../../services/hypertrophic.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hypertrophic-form',
  templateUrl: './hypertrophic-form.component.html',
  styleUrls: ['./hypertrophic-form.component.css']
})
export class HypertrophicFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  hypertrophicForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private hypertrophicService: HypertrophicService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Hypertrophic';
      this.hypertrophicService.getHypertrophic(+id).subscribe(
        res => {
          this.hypertrophicForm.patchValue({
            title: res.title,
            description: res.description,
            titleesp: res.titleesp,
            descriptionesp: res.descriptionesp,
            price: res.price,
            popup: res.popup,
            button: res.button,
            is_featured: res.is_featured,
            is_active: res.is_active,
            textFinanc: res.textFinanc,
            textFinancEsp: res.textFinancEsp,
            is_activeTf: res.is_activeTf,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Hypertrophic';
    }

    this.hypertrophicForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      titleesp: ['', Validators.required],
      descriptionesp: ['', Validators.required],
      price: ['', Validators.required],
      popup: ['', Validators.required],
      button: ['', Validators.required],
      is_featured: ['0'],
      is_active: ['1'],
      textFinanc: [''],
      textFinancEsp: [''],
      is_activeTf: [''],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.hypertrophicForm.get('image').setValue(file);
    }
  }

  get title() { return this.hypertrophicForm.get('title'); }
  get description() { return this.hypertrophicForm.get('description'); }
  get titleesp() { return this.hypertrophicForm.get('titleesp'); }
  get descriptionesp() { return this.hypertrophicForm.get('descriptionesp'); }
  get price() { return this.hypertrophicForm.get('price'); }
  get popup() { return this.hypertrophicForm.get('popup'); }
  get button() { return this.hypertrophicForm.get('button'); }
  get textFinanc() { return this.hypertrophicForm.get('textFinanc'); }
  get textFinancEsp() { return this.hypertrophicForm.get('textFinancEsp'); }
  get is_activeTf() { return this.hypertrophicForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.hypertrophicForm.get('title').value);
    formData.append('description', this.hypertrophicForm.get('description').value);
    formData.append('titleesp', this.hypertrophicForm.get('titleesp').value);
    formData.append('descriptionesp', this.hypertrophicForm.get('descriptionesp').value);
    formData.append('price', this.hypertrophicForm.get('price').value);
    formData.append('popup', this.hypertrophicForm.get('popup').value);
    formData.append('button', this.hypertrophicForm.get('button').value);
    formData.append('is_featured', this.hypertrophicForm.get('is_featured').value);
    formData.append('is_active', this.hypertrophicForm.get('is_active').value);
    formData.append('image', this.hypertrophicForm.get('image').value);
    formData.append('textFinanc', this.hypertrophicForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.hypertrophicForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.hypertrophicForm.get('is_activeTf').value);

    const id = this.hypertrophicForm.get('id').value;

    if (id) {
      this.hypertrophicService.updateHypertrophic(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/hypertrophic']);
          }
        },
        error => this.error = error
      );
    } else {
      this.hypertrophicService.createHypertrophic(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/hypertrophic']);
          }
        },
        error => this.error = error
      );
    }
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}
