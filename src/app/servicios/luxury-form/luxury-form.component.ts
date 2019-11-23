import { Component, OnInit } from '@angular/core';
import { LuxuringService } from '../../services/luxury.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-luxury-form',
  templateUrl: './luxury-form.component.html',
  styleUrls: ['./luxury-form.component.css']
})
export class LuxuryFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  luxuringForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private luxuringService: LuxuringService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Luxury';
      this.luxuringService.getLuxuring(+id).subscribe(
        res => {
          this.luxuringForm.patchValue({
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
      this.pageTitle = 'Create Luxury';
    }

    this.luxuringForm = this.fb.group({
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
      this.luxuringForm.get('image').setValue(file);
    }
  }

  get title() { return this.luxuringForm.get('title'); }
  get description() { return this.luxuringForm.get('description'); }
  get titleesp() { return this.luxuringForm.get('titleesp'); }
  get descriptionesp() { return this.luxuringForm.get('descriptionesp'); }
  get price() { return this.luxuringForm.get('price'); }
  get popup() { return this.luxuringForm.get('popup'); }
  get button() { return this.luxuringForm.get('button'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.luxuringForm.get('title').value);
    formData.append('description', this.luxuringForm.get('description').value);
    formData.append('titleesp', this.luxuringForm.get('titleesp').value);
    formData.append('descriptionesp', this.luxuringForm.get('descriptionesp').value);
    formData.append('price', this.luxuringForm.get('price').value);
    formData.append('popup', this.luxuringForm.get('popup').value);
    formData.append('button', this.luxuringForm.get('button').value);
    formData.append('is_featured', this.luxuringForm.get('is_featured').value);
    formData.append('is_active', this.luxuringForm.get('is_active').value);
    formData.append('image', this.luxuringForm.get('image').value);

    const id = this.luxuringForm.get('id').value;

    if (id) {
      this.luxuringService.updateLuxuring(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/luxuring']);
          }
        },
        error => this.error = error
      );
    } else {
      this.luxuringService.createLuxuring(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/luxuring']);
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
