import { Component, OnInit } from '@angular/core';
import { LookService } from '../../services/look.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-look-form',
  templateUrl: './look-form.component.html',
  styleUrls: ['./look-form.component.css']
})
export class LookFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  lookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lookService: LookService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Looks';
      this.lookService.getLook(+id).subscribe(
        res => {
          this.lookForm.patchValue({
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
      this.pageTitle = 'Create Looks';
    }

    this.lookForm = this.fb.group({
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
      this.lookForm.get('image').setValue(file);
    }
  }

  get title() { return this.lookForm.get('title'); }
  get description() { return this.lookForm.get('description'); }
  get titleesp() { return this.lookForm.get('titleesp'); }
  get descriptionesp() { return this.lookForm.get('descriptionesp'); }
  get price() { return this.lookForm.get('price'); }
  get popup() { return this.lookForm.get('popup'); }
  get button() { return this.lookForm.get('button'); }
  get buttonEs() { return this.lookForm.get('buttonEs'); }
  get target() { return this.lookForm.get('target'); }
  get textFinanc() { return this.lookForm.get('textFinanc'); }
  get textFinancEsp() { return this.lookForm.get('textFinancEsp'); }
  get is_activeTf() { return this.lookForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.lookForm.get('title').value);
    formData.append('description', this.lookForm.get('description').value);
    formData.append('titleesp', this.lookForm.get('titleesp').value);
    formData.append('descriptionesp', this.lookForm.get('descriptionesp').value);
    formData.append('price', this.lookForm.get('price').value);
    formData.append('popup', this.lookForm.get('popup').value);
    formData.append('button', this.lookForm.get('button').value);
    formData.append('buttonEs', this.lookForm.get('buttonEs').value);
    formData.append('target', this.lookForm.get('target').value);
    formData.append('is_featured', this.lookForm.get('is_featured').value);
    formData.append('is_active', this.lookForm.get('is_active').value);
    formData.append('image', this.lookForm.get('image').value);
    formData.append('textFinanc', this.lookForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.lookForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.lookForm.get('is_activeTf').value);

    const id = this.lookForm.get('id').value;

    if (id) {
      this.lookService.updateLook(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/look']);
          }
        },
        error => this.error = error
      );
    } else {
      this.lookService.createLook(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/look']);
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
