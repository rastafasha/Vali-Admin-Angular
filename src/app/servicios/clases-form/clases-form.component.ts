import { Component, OnInit } from '@angular/core';
import { ClasesService } from '../../services/clases.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clases-form',
  templateUrl: './clases-form.component.html',
  styleUrls: ['./clases-form.component.css']
})
export class ClasesFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  clasesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clasesService: ClasesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Clases';
      this.clasesService.getClases(+id).subscribe(
        res => {
          this.clasesForm.patchValue({
            title: res.title,
            description: res.description,
            titleesp: res.titleesp,
            descriptionesp: res.descriptionesp,
            price: res.price,
            popup: res.popup,
            button: res.button,
            buttonEs: res.buttonEs,
            is_featured: res.is_featured,
            is_active: res.is_active,
            textFinanc: res.textFinanc,
            textFinancEsp: res.textFinancEsp,
            is_activeTf: res.is_activeTf,
            target: res.target,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Clases';
    }

    this.clasesForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      titleesp: ['', Validators.required],
      descriptionesp: ['', Validators.required],
      price: ['', Validators.required],
      popup: ['', Validators.required],
      button: ['', Validators.required],
      buttonEs: ['', Validators.required],
      is_featured: ['0'],
      is_active: ['1'],
      textFinanc: ['', Validators.required],
      textFinancEsp: ['', Validators.required],
      is_activeTf: ['', Validators.required],
      target: ['', Validators.required],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.clasesForm.get('image').setValue(file);
    }
  }

  get title() { return this.clasesForm.get('title'); }
  get description() { return this.clasesForm.get('description'); }
  get titleesp() { return this.clasesForm.get('titleesp'); }
  get descriptionesp() { return this.clasesForm.get('descriptionesp'); }
  get price() { return this.clasesForm.get('price'); }
  get popup() { return this.clasesForm.get('popup'); }
  get button() { return this.clasesForm.get('button'); }
  get buttonEs() { return this.clasesForm.get('buttonEs'); }
  get target() { return this.clasesForm.get('target'); }
  get textFinanc() { return this.clasesForm.get('textFinanc'); }
  get textFinancEsp() { return this.clasesForm.get('textFinancEsp'); }
  get is_activeTf() { return this.clasesForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.clasesForm.get('title').value);
    formData.append('description', this.clasesForm.get('description').value);
    formData.append('titleesp', this.clasesForm.get('titleesp').value);
    formData.append('descriptionesp', this.clasesForm.get('descriptionesp').value);
    formData.append('price', this.clasesForm.get('price').value);
    formData.append('popup', this.clasesForm.get('popup').value);
    formData.append('button', this.clasesForm.get('button').value);
    formData.append('buttonEs', this.clasesForm.get('buttonEs').value);
    formData.append('target', this.clasesForm.get('target').value);
    formData.append('is_featured', this.clasesForm.get('is_featured').value);
    formData.append('is_active', this.clasesForm.get('is_active').value);
    formData.append('image', this.clasesForm.get('image').value);
    formData.append('textFinanc', this.clasesForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.clasesForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.clasesForm.get('is_activeTf').value);

    const id = this.clasesForm.get('id').value;

    if (id) {
      this.clasesService.updateClases(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/clases']);
          }
        },
        error => this.error = error
      );
    } else {
      this.clasesService.createClases(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/clases']);
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
