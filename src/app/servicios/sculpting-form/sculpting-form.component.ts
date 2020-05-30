import { Component, OnInit } from '@angular/core';
import { SculptingService } from '../../services/sculpting.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sculpting-form',
  templateUrl: './sculpting-form.component.html',
  styleUrls: ['./sculpting-form.component.css']
})
export class SculptingFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  sculptingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sculptingService: SculptingService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Sculpting';
      this.sculptingService.getSculpting(+id).subscribe(
        res => {
          this.sculptingForm.patchValue({
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
      this.pageTitle = 'Create Sculpting';
    }

    this.sculptingForm = this.fb.group({
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
      this.sculptingForm.get('image').setValue(file);
    }
  }

  get title() { return this.sculptingForm.get('title'); }
  get description() { return this.sculptingForm.get('description'); }
  get titleesp() { return this.sculptingForm.get('titleesp'); }
  get descriptionesp() { return this.sculptingForm.get('descriptionesp'); }
  get price() { return this.sculptingForm.get('price'); }
  get popup() { return this.sculptingForm.get('popup'); }
  get button() { return this.sculptingForm.get('button'); }
  get textFinanc() { return this.sculptingForm.get('textFinanc'); }
  get textFinancEsp() { return this.sculptingForm.get('textFinancEsp'); }
  get is_activeTf() { return this.sculptingForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.sculptingForm.get('title').value);
    formData.append('description', this.sculptingForm.get('description').value);
    formData.append('titleesp', this.sculptingForm.get('titleesp').value);
    formData.append('descriptionesp', this.sculptingForm.get('descriptionesp').value);
    formData.append('price', this.sculptingForm.get('price').value);
    formData.append('popup', this.sculptingForm.get('popup').value);
    formData.append('button', this.sculptingForm.get('button').value);
    formData.append('is_featured', this.sculptingForm.get('is_featured').value);
    formData.append('is_active', this.sculptingForm.get('is_active').value);
    formData.append('image', this.sculptingForm.get('image').value);
    formData.append('textFinanc', this.sculptingForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.sculptingForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.sculptingForm.get('is_activeTf').value);

    const id = this.sculptingForm.get('id').value;

    if (id) {
      this.sculptingService.updateSculpting(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/sculpting']);
          }
        },
        error => this.error = error
      );
    } else {
      this.sculptingService.createSculpting(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/sculpting']);
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
