import { Component, OnInit } from '@angular/core';
import { RestorativeService } from '../../services/restorative.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-restorative-form',
  templateUrl: './restorative-form.component.html',
  styleUrls: ['./restorative-form.component.css']
})
export class RestorativeFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  restorativeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private restorativeService: RestorativeService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Restorative';
      this.restorativeService.getRestorative(+id).subscribe(
        res => {
          this.restorativeForm.patchValue({
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
      this.pageTitle = 'Create Restorative';
    }

    this.restorativeForm = this.fb.group({
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
      this.restorativeForm.get('image').setValue(file);
    }
  }

  get title() { return this.restorativeForm.get('title'); }
  get description() { return this.restorativeForm.get('description'); }
  get titleesp() { return this.restorativeForm.get('titleesp'); }
  get descriptionesp() { return this.restorativeForm.get('descriptionesp'); }
  get price() { return this.restorativeForm.get('price'); }
  get popup() { return this.restorativeForm.get('popup'); }
  get button() { return this.restorativeForm.get('button'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.restorativeForm.get('title').value);
    formData.append('description', this.restorativeForm.get('description').value);
    formData.append('titleesp', this.restorativeForm.get('titleesp').value);
    formData.append('descriptionesp', this.restorativeForm.get('descriptionesp').value);
    formData.append('price', this.restorativeForm.get('price').value);
    formData.append('popup', this.restorativeForm.get('popup').value);
    formData.append('button', this.restorativeForm.get('button').value);
    formData.append('is_featured', this.restorativeForm.get('is_featured').value);
    formData.append('is_active', this.restorativeForm.get('is_active').value);
    formData.append('image', this.restorativeForm.get('image').value);

    const id = this.restorativeForm.get('id').value;

    if (id) {
      this.restorativeService.updateRestorative(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/restorative']);
          }
        },
        error => this.error = error
      );
    } else {
      this.restorativeService.createRestorative(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/restorative']);
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
