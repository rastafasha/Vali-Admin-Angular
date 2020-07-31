import { Component, OnInit } from '@angular/core';
import { SpecialtService } from '../../services/specialt.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-specialt-form',
  templateUrl: './specialt-form.component.html',
  styleUrls: ['./specialt-form.component.css']
})
export class SpecialtFormComponent implements OnInit {

  public Editor = ClassicEditor;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  specialtForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private specialtService: SpecialtService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Special Treatment';
      this.specialtService.getSpecialt(+id).subscribe(
        res => {
          this.specialtForm.patchValue({
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
      this.pageTitle = 'Create Special Treatment';
    }

    this.specialtForm = this.fb.group({
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
      this.specialtForm.get('image').setValue(file);
    }
  }

  get title() { return this.specialtForm.get('title'); }
  get description() { return this.specialtForm.get('description'); }
  get titleesp() { return this.specialtForm.get('titleesp'); }
  get descriptionesp() { return this.specialtForm.get('descriptionesp'); }
  get price() { return this.specialtForm.get('price'); }
  get popup() { return this.specialtForm.get('popup'); }
  get button() { return this.specialtForm.get('button'); }
  get buttonEs() { return this.specialtForm.get('buttonEs'); }
  get target() { return this.specialtForm.get('target'); }
  get textFinanc() { return this.specialtForm.get('textFinanc'); }
  get textFinancEsp() { return this.specialtForm.get('textFinancEsp'); }
  get is_activeTf() { return this.specialtForm.get('is_activeTf'); }


  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.specialtForm.get('title').value);
    formData.append('description', this.specialtForm.get('description').value);
    formData.append('titleesp', this.specialtForm.get('titleesp').value);
    formData.append('descriptionesp', this.specialtForm.get('descriptionesp').value);
    formData.append('price', this.specialtForm.get('price').value);
    formData.append('popup', this.specialtForm.get('popup').value);
    formData.append('button', this.specialtForm.get('button').value);
    formData.append('buttonEs', this.specialtForm.get('buttonEs').value);
    formData.append('target', this.specialtForm.get('target').value);
    formData.append('is_featured', this.specialtForm.get('is_featured').value);
    formData.append('is_active', this.specialtForm.get('is_active').value);
    formData.append('image', this.specialtForm.get('image').value);
    formData.append('textFinanc', this.specialtForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.specialtForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.specialtForm.get('is_activeTf').value);

    const id = this.specialtForm.get('id').value;

    if (id) {
      this.specialtService.updateSpecialt(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/specialt']);
          }
        },
        error => this.error = error
      );
    } else {
      this.specialtService.createSpecialt(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/specialt']);
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
