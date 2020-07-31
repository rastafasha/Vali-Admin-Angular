import { Component, OnInit } from '@angular/core';
import { BrighteningService } from '../../services/brightening.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-brightening-form',
  templateUrl: './brightening-form.component.html',
  styleUrls: ['./brightening-form.component.css']
})
export class BrighteningFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  brighteningForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private brighteningService: BrighteningService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Brightening';
      this.brighteningService.getBrightening(+id).subscribe(
        res => {
          this.brighteningForm.patchValue({
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
      this.pageTitle = 'Create Brightening';
    }

    this.brighteningForm = this.fb.group({
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
      this.brighteningForm.get('image').setValue(file);
    }
  }

  get title() { return this.brighteningForm.get('title'); }
  get description() { return this.brighteningForm.get('description'); }
  get titleesp() { return this.brighteningForm.get('titleesp'); }
  get descriptionesp() { return this.brighteningForm.get('descriptionesp'); }
  get price() { return this.brighteningForm.get('price'); }
  get popup() { return this.brighteningForm.get('popup'); }
  get button() { return this.brighteningForm.get('button'); }
  get buttonEs() { return this.brighteningForm.get('buttonEs'); }
  get target() { return this.brighteningForm.get('target'); }
  get textFinanc() { return this.brighteningForm.get('textFinanc'); }
  get textFinancEsp() { return this.brighteningForm.get('textFinancEsp'); }
  get is_activeTf() { return this.brighteningForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.brighteningForm.get('title').value);
    formData.append('description', this.brighteningForm.get('description').value);
    formData.append('titleesp', this.brighteningForm.get('titleesp').value);
    formData.append('descriptionesp', this.brighteningForm.get('descriptionesp').value);
    formData.append('price', this.brighteningForm.get('price').value);
    formData.append('popup', this.brighteningForm.get('popup').value);
    formData.append('button', this.brighteningForm.get('button').value);
    formData.append('buttonEs', this.brighteningForm.get('buttonEs').value);
    formData.append('target', this.brighteningForm.get('target').value);
    formData.append('is_featured', this.brighteningForm.get('is_featured').value);
    formData.append('is_active', this.brighteningForm.get('is_active').value);
    formData.append('image', this.brighteningForm.get('image').value);
    formData.append('textFinanc', this.brighteningForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.brighteningForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.brighteningForm.get('is_activeTf').value);

    const id = this.brighteningForm.get('id').value;

    if (id) {
      this.brighteningService.updateBrightening(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/brightening']);
          }
        },
        error => this.error = error
      );
    } else {
      this.brighteningService.createBrightening(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/brightening']);
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
