import { Component, OnInit } from '@angular/core';
import { WaxinfoService } from '../../services/waxinfo.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-waxinfo-form',
  templateUrl: './waxinfo-form.component.html',
  styleUrls: ['./waxinfo-form.component.css']
})
export class WaxinfoFormComponent implements OnInit {

  public Editor = ClassicEditor;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  waxinfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private waxinfoService: WaxinfoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }


  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Wax info';
      this.waxinfoService.getWaxinfo(+id).subscribe(
        res => {
          this.waxinfoForm.patchValue({
            title: res.title,
            titleesp: res.titleesp,
            description: res.description,
            descriptionesp: res.descriptionesp,
            is_featured: res.is_featured,
            is_active: res.is_active,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Wax Info';
    }

    this.waxinfoForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      titleesp: ['', Validators.required],
      description: ['', Validators.required],
      descriptionesp: ['', Validators.required],
      is_featured: ['0'],
      is_active: ['1'],
      image: [''],
    });

  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.waxinfoForm.get('image').setValue(file);
    }
  }

  get title() { return this.waxinfoForm.get('title'); }
  get titleesp() { return this.waxinfoForm.get('titleesp'); }
  get description() { return this.waxinfoForm.get('description'); }
  get descriptionesp() { return this.waxinfoForm.get('descriptionesp'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.waxinfoForm.get('title').value);
    formData.append('titleesp', this.waxinfoForm.get('titleesp').value);
    formData.append('description', this.waxinfoForm.get('description').value);
    formData.append('descriptionesp', this.waxinfoForm.get('descriptionesp').value);
    formData.append('is_featured', this.waxinfoForm.get('is_featured').value);
    formData.append('is_active', this.waxinfoForm.get('is_active').value);
    formData.append('image', this.waxinfoForm.get('image').value);

    const id = this.waxinfoForm.get('id').value;

    if (id) {
      this.waxinfoService.updateWaxinfo(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/waxinfo']);
          }
        },
        error => this.error = error
      );
    } else {
      this.waxinfoService.createWaxinfo(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/waxinfo']);
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
