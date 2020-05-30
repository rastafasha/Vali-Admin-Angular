import { Component, OnInit } from '@angular/core';
import { WaxService } from '../../services/wax.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';


@Component({
  selector: 'app-wax-form',
  templateUrl: './wax-form.component.html',
  styleUrls: ['./wax-form.component.css']
})
export class WaxFormComponent implements OnInit {

  public Editor = ClassicEditor;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  waxForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private waxService: WaxService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }




  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Wax';
      this.waxService.getWax(+id).subscribe(
        res => {
          this.waxForm.patchValue({
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
      this.pageTitle = 'Create Wax';
    }

    this.waxForm = this.fb.group({
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
      this.waxForm.get('image').setValue(file);
    }
  }

  get title() { return this.waxForm.get('title'); }
  get description() { return this.waxForm.get('description'); }
  get titleesp() { return this.waxForm.get('titleesp'); }
  get descriptionesp() { return this.waxForm.get('descriptionesp'); }
  get price() { return this.waxForm.get('price'); }
  get popup() { return this.waxForm.get('popup'); }
  get button() { return this.waxForm.get('button'); }
  get textFinanc() { return this.waxForm.get('textFinanc'); }
  get textFinancEsp() { return this.waxForm.get('textFinancEsp'); }
  get is_activeTf() { return this.waxForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.waxForm.get('title').value);
    formData.append('description', this.waxForm.get('description').value);
    formData.append('titleesp', this.waxForm.get('titleesp').value);
    formData.append('descriptionesp', this.waxForm.get('descriptionesp').value);
    formData.append('price', this.waxForm.get('price').value);
    formData.append('popup', this.waxForm.get('popup').value);
    formData.append('button', this.waxForm.get('button').value);
    formData.append('is_featured', this.waxForm.get('is_featured').value);
    formData.append('is_active', this.waxForm.get('is_active').value);
    formData.append('image', this.waxForm.get('image').value);
    formData.append('textFinanc', this.waxForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.waxForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.waxForm.get('is_activeTf').value);

    const id = this.waxForm.get('id').value;

    if (id) {
      this.waxService.updateWax(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/wax']);
          }
        },
        error => this.error = error
      );
    } else {
      this.waxService.createWax(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/wax']);
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
