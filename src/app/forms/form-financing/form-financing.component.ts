import { Component, OnInit } from '@angular/core';
import { FinancingService } from '../../services/financing.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-financing',
  templateUrl: './form-financing.component.html',
  styleUrls: ['./form-financing.component.css']
})
export class FormFinancingComponent implements OnInit {

  public Editor = ClassicEditor;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  financingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private financingService: FinancingService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Financing Video';
      this.financingService.getFinancing(+id).subscribe(
        res => {
          this.financingForm.patchValue({
            video: res.video,
            videoEsp: res.videoEsp,
            verVideo: res.verVideo,
            verImagen: res.verImagen,
            is_active: res.is_active,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    }

    this.financingForm = this.fb.group({
      id: [''],
      video: [''],
      videoEsp: [''],
      verVideo: [''],
      verImagen: [''],
      is_active: ['1'],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.financingForm.get('image').setValue(file);
    }
  }

  get video() { return this.financingForm.get('video'); }
  get videoEsp() { return this.financingForm.get('videoEsp'); }
  get verVideo() { return this.financingForm.get('verVideo'); }
  get verImagen() { return this.financingForm.get('verImagen'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('video', this.financingForm.get('video').value);
    formData.append('videoEsp', this.financingForm.get('videoEsp').value);
    formData.append('verVideo', this.financingForm.get('verVideo').value);
    formData.append('verImagen', this.financingForm.get('verImagen').value);
    formData.append('is_active', this.financingForm.get('is_active').value);
    formData.append('image', this.financingForm.get('image').value);

    const id = this.financingForm.get('id').value;

    if (id) {
      this.financingService.updateFinancing(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/financing']);
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
