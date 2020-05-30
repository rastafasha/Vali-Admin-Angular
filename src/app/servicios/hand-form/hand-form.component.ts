import { Component, OnInit } from '@angular/core';
import { HandService } from '../../services/hand.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hand-form',
  templateUrl: './hand-form.component.html',
  styleUrls: ['./hand-form.component.css']
})
export class HandFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  handForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private handService: HandService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Hand';
      this.handService.getHand(+id).subscribe(
        res => {
          this.handForm.patchValue({
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
      this.pageTitle = 'Create Hand';
    }

    this.handForm = this.fb.group({
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
      this.handForm.get('image').setValue(file);
    }
  }

  get title() { return this.handForm.get('title'); }
  get description() { return this.handForm.get('description'); }
  get titleesp() { return this.handForm.get('titleesp'); }
  get descriptionesp() { return this.handForm.get('descriptionesp'); }
  get price() { return this.handForm.get('price'); }
  get popup() { return this.handForm.get('popup'); }
  get button() { return this.handForm.get('button'); }
  get textFinanc() { return this.handForm.get('textFinanc'); }
  get textFinancEsp() { return this.handForm.get('textFinancEsp'); }
  get is_activeTf() { return this.handForm.get('is_activeTf'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.handForm.get('title').value);
    formData.append('description', this.handForm.get('description').value);
    formData.append('titleesp', this.handForm.get('titleesp').value);
    formData.append('descriptionesp', this.handForm.get('descriptionesp').value);
    formData.append('price', this.handForm.get('price').value);
    formData.append('popup', this.handForm.get('popup').value);
    formData.append('button', this.handForm.get('button').value);
    formData.append('is_featured', this.handForm.get('is_featured').value);
    formData.append('is_active', this.handForm.get('is_active').value);
    formData.append('image', this.handForm.get('image').value);
    formData.append('textFinanc', this.handForm.get('textFinanc').value);
    formData.append('textFinancEsp', this.handForm.get('textFinancEsp').value);
    formData.append('is_activeTf', this.handForm.get('is_activeTf').value);

    const id = this.handForm.get('id').value;

    if (id) {
      this.handService.updateHand(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/hand']);
          }
        },
        error => this.error = error
      );
    } else {
      this.handService.createHand(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/hand']);
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
