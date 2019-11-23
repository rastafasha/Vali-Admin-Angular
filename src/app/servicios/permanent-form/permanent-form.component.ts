import { Component, OnInit } from '@angular/core';
import { PermanentService } from '../../services/permanent.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-permanent-form',
  templateUrl: './permanent-form.component.html',
  styleUrls: ['./permanent-form.component.css']
})
export class PermanentFormComponent implements OnInit {

  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  permanentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private permanentService: PermanentService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Permanent';
      this.permanentService.getPermanent(+id).subscribe(
        res => {
          this.permanentForm.patchValue({
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
      this.pageTitle = 'Create Permanent';
    }

    this.permanentForm = this.fb.group({
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
      this.permanentForm.get('image').setValue(file);
    }
  }

  get title() { return this.permanentForm.get('title'); }
  get description() { return this.permanentForm.get('description'); }
  get titleesp() { return this.permanentForm.get('titleesp'); }
  get descriptionesp() { return this.permanentForm.get('descriptionesp'); }
  get price() { return this.permanentForm.get('price'); }
  get popup() { return this.permanentForm.get('popup'); }
  get button() { return this.permanentForm.get('button'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.permanentForm.get('title').value);
    formData.append('description', this.permanentForm.get('description').value);
    formData.append('titleesp', this.permanentForm.get('titleesp').value);
    formData.append('descriptionesp', this.permanentForm.get('descriptionesp').value);
    formData.append('price', this.permanentForm.get('price').value);
    formData.append('popup', this.permanentForm.get('popup').value);
    formData.append('button', this.permanentForm.get('button').value);
    formData.append('is_featured', this.permanentForm.get('is_featured').value);
    formData.append('is_active', this.permanentForm.get('is_active').value);
    formData.append('image', this.permanentForm.get('image').value);

    const id = this.permanentForm.get('id').value;

    if (id) {
      this.permanentService.updatePermanent(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/permanent']);
          }
        },
        error => this.error = error
      );
    } else {
      this.permanentService.createPermanent(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/permanent']);
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
