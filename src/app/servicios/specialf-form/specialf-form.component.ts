import { Component, OnInit } from '@angular/core';
import { SpecialfService } from '../../services/specialf.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-specialf-form',
  templateUrl: './specialf-form.component.html',
  styleUrls: ['./specialf-form.component.css']
})
export class SpecialfFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  specialfForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private specialfService: SpecialfService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Special face';
      this.specialfService.getSpecialf(+id).subscribe(
        res => {
          this.specialfForm.patchValue({
            title: res.title,
            description: res.description,
            titleesp: res.titleesp,
            descriptionesp: res.descriptionesp,
            price: res.price,
            popup: res.popup,
            button: res.button,
            is_featured: res.is_featured,
            is_active: res.is_active,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Special face';
    }

    this.specialfForm = this.fb.group({
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
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.specialfForm.get('image').setValue(file);
    }
  }

  get title() { return this.specialfForm.get('title'); }
  get description() { return this.specialfForm.get('description'); }
  get titleesp() { return this.specialfForm.get('titleesp'); }
  get descriptionesp() { return this.specialfForm.get('descriptionesp'); }
  get price() { return this.specialfForm.get('price'); }
  get popup() { return this.specialfForm.get('popup'); }
  get button() { return this.specialfForm.get('button'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.specialfForm.get('title').value);
    formData.append('description', this.specialfForm.get('description').value);
    formData.append('titleesp', this.specialfForm.get('titleesp').value);
    formData.append('descriptionesp', this.specialfForm.get('descriptionesp').value);
    formData.append('price', this.specialfForm.get('price').value);
    formData.append('popup', this.specialfForm.get('popup').value);
    formData.append('button', this.specialfForm.get('button').value);
    formData.append('is_featured', this.specialfForm.get('is_featured').value);
    formData.append('is_active', this.specialfForm.get('is_active').value);
    formData.append('image', this.specialfForm.get('image').value);

    const id = this.specialfForm.get('id').value;

    if (id) {
      this.specialfService.updateSpecialf(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/specialf']);
          }
        },
        error => this.error = error
      );
    } else {
      this.specialfService.createSpecialf(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/specialf']);
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
