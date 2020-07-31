import { Component, OnInit } from '@angular/core';
import { BodyService } from '../../services/body.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-body-form',
  templateUrl: './body-form.component.html',
  styleUrls: ['./body-form.component.css']
})
export class BodyFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  bodyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bodyService: BodyService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Body';
      this.bodyService.getBody(+id).subscribe(
        res => {
          this.bodyForm.patchValue({
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
      this.pageTitle = 'Create Body';
    }

    this.bodyForm = this.fb.group({
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
      this.bodyForm.get('image').setValue(file);
    }
  }

  get title() { return this.bodyForm.get('title'); }
  get description() { return this.bodyForm.get('description'); }
  get titleesp() { return this.bodyForm.get('titleesp'); }
  get descriptionesp() { return this.bodyForm.get('descriptionesp'); }
  get price() { return this.bodyForm.get('price'); }
  get popup() { return this.bodyForm.get('popup'); }
  get button() { return this.bodyForm.get('button'); }
  get buttonEs() { return this.bodyForm.get('buttonEs'); }
  get target() { return this.bodyForm.get('target'); }
  get textFinanc() { return this.bodyForm.get('textFinanc'); }
  get textFinancEsp() { return this.bodyForm.get('textFinancEsp'); }
  get is_activeTf() { return this.bodyForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.bodyForm.get('title').value);
    formData.append('description', this.bodyForm.get('description').value);
    formData.append('titleesp', this.bodyForm.get('titleesp').value);
    formData.append('descriptionesp', this.bodyForm.get('descriptionesp').value);
    formData.append('price', this.bodyForm.get('price').value);
    formData.append('popup', this.bodyForm.get('popup').value);
    formData.append('button', this.bodyForm.get('button').value);
    formData.append('buttonEs', this.bodyForm.get('buttonEs').value);
    formData.append('target', this.bodyForm.get('target').value);
    formData.append('is_featured', this.bodyForm.get('is_featured').value);
    formData.append('is_active', this.bodyForm.get('is_active').value);
    formData.append('image', this.bodyForm.get('image').value);
    formData.append('textFinanc', this.bodyForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.bodyForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.bodyForm.get('is_activeTf').value);

    const id = this.bodyForm.get('id').value;

    if (id) {
      this.bodyService.updateBody(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/body']);
          }
        },
        error => this.error = error
      );
    } else {
      this.bodyService.createBody(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/body']);
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
