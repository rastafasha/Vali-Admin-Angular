import { Component, OnInit } from '@angular/core';
import { WrappingService } from '../../services/wrapping.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wrapping-form',
  templateUrl: './wrapping-form.component.html',
  styleUrls: ['./wrapping-form.component.css']
})
export class WrappingFormComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  public Editor = ClassicEditor;

  wrappingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private wrappingService: WrappingService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Wrapping';
      this.wrappingService.getWrapping(+id).subscribe(
        res => {
          this.wrappingForm.patchValue({
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
      this.pageTitle = 'Create Wrapping';
    }

    this.wrappingForm = this.fb.group({
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
      this.wrappingForm.get('image').setValue(file);
    }
  }

  get title() { return this.wrappingForm.get('title'); }
  get description() { return this.wrappingForm.get('description'); }
  get titleesp() { return this.wrappingForm.get('titleesp'); }
  get descriptionesp() { return this.wrappingForm.get('descriptionesp'); }
  get price() { return this.wrappingForm.get('price'); }
  get popup() { return this.wrappingForm.get('popup'); }
  get button() { return this.wrappingForm.get('button'); }
  get buttonEs() { return this.wrappingForm.get('buttonEs'); }
  get target() { return this.wrappingForm.get('target'); }
  get textFinanc() { return this.wrappingForm.get('textFinanc'); }
  get textFinancEsp() { return this.wrappingForm.get('textFinancEsp'); }
  get is_activeTf() { return this.wrappingForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.wrappingForm.get('title').value);
    formData.append('description', this.wrappingForm.get('description').value);
    formData.append('titleesp', this.wrappingForm.get('titleesp').value);
    formData.append('descriptionesp', this.wrappingForm.get('descriptionesp').value);
    formData.append('price', this.wrappingForm.get('price').value);
    formData.append('popup', this.wrappingForm.get('popup').value);
    formData.append('button', this.wrappingForm.get('button').value);
    formData.append('buttonEs', this.wrappingForm.get('buttonEs').value);
    formData.append('target', this.wrappingForm.get('target').value);
    formData.append('is_featured', this.wrappingForm.get('is_featured').value);
    formData.append('is_active', this.wrappingForm.get('is_active').value);
    formData.append('image', this.wrappingForm.get('image').value);
    formData.append('textFinanc', this.wrappingForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.wrappingForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.wrappingForm.get('is_activeTf').value);

    const id = this.wrappingForm.get('id').value;

    if (id) {
      this.wrappingService.updateWrapping(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/wrapping']);
          }
        },
        error => this.error = error
      );
    } else {
      this.wrappingService.createWrapping(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/wrapping']);
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
