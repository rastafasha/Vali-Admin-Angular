import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../services/gallery.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css']
})
export class GalleryFormComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  galleryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private galleryService: GalleryService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Gallery';
      this.galleryService.getGallery(+id).subscribe(
        res => {
          this.galleryForm.patchValue({
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
      this.pageTitle = 'Create Gallery';
    }

    this.galleryForm = this.fb.group({
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
      this.galleryForm.get('image').setValue(file);
    }
  }

  get title() { return this.galleryForm.get('title'); }
  get description() { return this.galleryForm.get('description'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.galleryForm.get('title').value);
    formData.append('description', this.galleryForm.get('description').value);
    formData.append('is_featured', this.galleryForm.get('is_featured').value);
    formData.append('is_active', this.galleryForm.get('is_active').value);
    formData.append('image', this.galleryForm.get('image').value);

    const id = this.galleryForm.get('id').value;

    if (id) {
      this.galleryService.updateGallery(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/gallery']);
          }
        },
        error => this.error = error
      );
    } else {
      this.galleryService.createGallery(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/gallery']);
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
