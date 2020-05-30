import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/publicacion.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-special-form',
  templateUrl: './special-form.component.html',
  styleUrls: ['./special-form.component.css']
})
export class SpecialFormComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  publicacionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Special posts';
      this.publicacionService.getPublicacion(+id).subscribe(
        res => {
          this.publicacionForm.patchValue({
            title: res.title,
            description: res.description,
            is_featured: res.is_featured,
            is_active: res.is_active,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create Special posts';
    }

    this.publicacionForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      is_featured: ['0'],
      is_active: ['1'],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.publicacionForm.get('image').setValue(file);
    }
  }

  get title() { return this.publicacionForm.get('title'); }
  get description() { return this.publicacionForm.get('description'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.publicacionForm.get('title').value);
    formData.append('description', this.publicacionForm.get('description').value);
    formData.append('is_featured', this.publicacionForm.get('is_featured').value);
    formData.append('is_active', this.publicacionForm.get('is_active').value);
    formData.append('image', this.publicacionForm.get('image').value);

    const id = this.publicacionForm.get('id').value;

    if (id) {
      this.publicacionService.updatePublicacion(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/red']);
          }
        },
        error => this.error = error
      );
    } else {
      this.publicacionService.createPublicacion(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/red']);
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
