import { Component, OnInit } from '@angular/core';
import { CalmingService } from '../../services/calming.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-calming-form',
  templateUrl: './calming-form.component.html',
  styleUrls: ['./calming-form.component.css']
})
export class CalmingFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  calmingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private calmingService: CalmingService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Calming';
      this.calmingService.getCalming(+id).subscribe(
        res => {
          this.calmingForm.patchValue({
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
      this.pageTitle = 'Create Calming';
    }

    this.calmingForm = this.fb.group({
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
      this.calmingForm.get('image').setValue(file);
    }
  }

  get title() { return this.calmingForm.get('title'); }
  get description() { return this.calmingForm.get('description'); }
  get titleesp() { return this.calmingForm.get('titleesp'); }
  get descriptionesp() { return this.calmingForm.get('descriptionesp'); }
  get price() { return this.calmingForm.get('price'); }
  get popup() { return this.calmingForm.get('popup'); }
  get button() { return this.calmingForm.get('button'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.calmingForm.get('title').value);
    formData.append('description', this.calmingForm.get('description').value);
    formData.append('titleesp', this.calmingForm.get('titleesp').value);
    formData.append('descriptionesp', this.calmingForm.get('descriptionesp').value);
    formData.append('price', this.calmingForm.get('price').value);
    formData.append('popup', this.calmingForm.get('popup').value);
    formData.append('button', this.calmingForm.get('button').value);
    formData.append('is_featured', this.calmingForm.get('is_featured').value);
    formData.append('is_active', this.calmingForm.get('is_active').value);
    formData.append('image', this.calmingForm.get('image').value);

    const id = this.calmingForm.get('id').value;

    if (id) {
      this.calmingService.updateCalming(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/calming']);
          }
        },
        error => this.error = error
      );
    } else {
      this.calmingService.createCalming(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/calming']);
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
