import { Component, OnInit } from '@angular/core';
import { BridalService } from '../../services/bridal.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bridal-form',
  templateUrl: './bridal-form.component.html',
  styleUrls: ['./bridal-form.component.css']
})
export class BridalFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  bridalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bridalService: BridalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Bridal';
      this.bridalService.getBridal(+id).subscribe(
        res => {
          this.bridalForm.patchValue({
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
      this.pageTitle = 'Create Bridal';
    }

    this.bridalForm = this.fb.group({
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
      this.bridalForm.get('image').setValue(file);
    }
  }

  get title() { return this.bridalForm.get('title'); }
  get description() { return this.bridalForm.get('description'); }
  get titleesp() { return this.bridalForm.get('titleesp'); }
  get descriptionesp() { return this.bridalForm.get('descriptionesp'); }
  get price() { return this.bridalForm.get('price'); }
  get popup() { return this.bridalForm.get('popup'); }
  get button() { return this.bridalForm.get('button'); }
  get buttonEs() { return this.bridalForm.get('buttonEs'); }
  get target() { return this.bridalForm.get('target'); }
  get textFinanc() { return this.bridalForm.get('textFinanc'); }
  get textFinancEsp() { return this.bridalForm.get('textFinancEsp'); }
  get is_activeTf() { return this.bridalForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.bridalForm.get('title').value);
    formData.append('description', this.bridalForm.get('description').value);
    formData.append('titleesp', this.bridalForm.get('titleesp').value);
    formData.append('descriptionesp', this.bridalForm.get('descriptionesp').value);
    formData.append('price', this.bridalForm.get('price').value);
    formData.append('popup', this.bridalForm.get('popup').value);
    formData.append('button', this.bridalForm.get('button').value);
    formData.append('buttonEs', this.bridalForm.get('buttonEs').value);
    formData.append('target', this.bridalForm.get('target').value);
    formData.append('is_featured', this.bridalForm.get('is_featured').value);
    formData.append('is_active', this.bridalForm.get('is_active').value);
    formData.append('image', this.bridalForm.get('image').value);
    formData.append('textFinanc', this.bridalForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.bridalForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.bridalForm.get('is_activeTf').value);

    const id = this.bridalForm.get('id').value;

    if (id) {
      this.bridalService.updateBridal(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/bridal']);
          }
        },
        error => this.error = error
      );
    } else {
      this.bridalService.createBridal(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/bridal']);
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
