import { Component, OnInit } from '@angular/core';
import { AntiageService } from '../../services/antiage.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-antiage-form',
  templateUrl: './antiage-form.component.html',
  styleUrls: ['./antiage-form.component.css']
})
export class AntiageFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  antiageForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private antiageService: AntiageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Antiage';
      this.antiageService.getAntiage(+id).subscribe(
        res => {
          this.antiageForm.patchValue({
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
      this.pageTitle = 'Create Antiage';
    }

    this.antiageForm = this.fb.group({
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
      this.antiageForm.get('image').setValue(file);
    }
  }

  get title() { return this.antiageForm.get('title'); }
  get description() { return this.antiageForm.get('description'); }
  get titleesp() { return this.antiageForm.get('titleesp'); }
  get descriptionesp() { return this.antiageForm.get('descriptionesp'); }
  get price() { return this.antiageForm.get('price'); }
  get popup() { return this.antiageForm.get('popup'); }
  get button() { return this.antiageForm.get('button'); }
  get textFinanc() { return this.antiageForm.get('textFinanc'); }
  get textFinancEsp() { return this.antiageForm.get('textFinancEsp'); }
  get is_activeTf() { return this.antiageForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.antiageForm.get('title').value);
    formData.append('description', this.antiageForm.get('description').value);
    formData.append('titleesp', this.antiageForm.get('titleesp').value);
    formData.append('descriptionesp', this.antiageForm.get('descriptionesp').value);
    formData.append('price', this.antiageForm.get('price').value);
    formData.append('popup', this.antiageForm.get('popup').value);
    formData.append('button', this.antiageForm.get('button').value);
    formData.append('is_featured', this.antiageForm.get('is_featured').value);
    formData.append('is_active', this.antiageForm.get('is_active').value);
    formData.append('image', this.antiageForm.get('image').value);
    formData.append('textFinanc', this.antiageForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.antiageForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.antiageForm.get('is_activeTf').value);

    const id = this.antiageForm.get('id').value;

    if (id) {
      this.antiageService.updateAntiage(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/antiage']);
          }
        },
        error => this.error = error
      );
    } else {
      this.antiageService.createAntiage(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/antiage']);
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
