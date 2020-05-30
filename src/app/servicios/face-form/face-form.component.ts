import { Component, OnInit } from '@angular/core';
import { FibrofaceService } from '../../services/fibroface.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-face-form',
  templateUrl: './face-form.component.html',
  styleUrls: ['./face-form.component.css']
})
export class FaceFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  fibrofaceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fibrofaceService: FibrofaceService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Fibro - Face';
      this.fibrofaceService.getFibroface(+id).subscribe(
        res => {
          this.fibrofaceForm.patchValue({
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
      this.pageTitle = 'Create Fibro-Face';
    }

    this.fibrofaceForm = this.fb.group({
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
      this.fibrofaceForm.get('image').setValue(file);
    }
  }

  get title() { return this.fibrofaceForm.get('title'); }
  get description() { return this.fibrofaceForm.get('description'); }
  get titleesp() { return this.fibrofaceForm.get('titleesp'); }
  get descriptionesp() { return this.fibrofaceForm.get('descriptionesp'); }
  get price() { return this.fibrofaceForm.get('price'); }
  get popup() { return this.fibrofaceForm.get('popup'); }
  get button() { return this.fibrofaceForm.get('button'); }
  get textFinanc() { return this.fibrofaceForm.get('textFinanc'); }
  get textFinancEsp() { return this.fibrofaceForm.get('textFinancEsp'); }
  get is_activeTf() { return this.fibrofaceForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.fibrofaceForm.get('title').value);
    formData.append('description', this.fibrofaceForm.get('description').value);
    formData.append('titleesp', this.fibrofaceForm.get('titleesp').value);
    formData.append('descriptionesp', this.fibrofaceForm.get('descriptionesp').value);
    formData.append('price', this.fibrofaceForm.get('price').value);
    formData.append('popup', this.fibrofaceForm.get('popup').value);
    formData.append('button', this.fibrofaceForm.get('button').value);
    formData.append('is_featured', this.fibrofaceForm.get('is_featured').value);
    formData.append('is_active', this.fibrofaceForm.get('is_active').value);
    formData.append('image', this.fibrofaceForm.get('image').value);
    formData.append('textFinanc', this.fibrofaceForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.fibrofaceForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.fibrofaceForm.get('is_activeTf').value);

    const id = this.fibrofaceForm.get('id').value;

    if (id) {
      this.fibrofaceService.updateFibroface(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/face']);
          }
        },
        error => this.error = error
      );
    } else {
      this.fibrofaceService.createFibroface(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/face']);
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
