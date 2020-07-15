import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { Location } from '@angular/common';



@Component({
  selector: 'app-membership-form',
  templateUrl: './membership-form.component.html',
  styleUrls: ['./membership-form.component.css']
})
export class MembershipFormComponent implements OnInit {

   public Editor = ClassicEditor;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  membershipForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Page';
      this.pageService.getMembership(+id).subscribe(
        res => {
          this.membershipForm.patchValue({
            title: res.title,
            description: res.description,
            description2: res.description2,
            titulo: res.titulo,
            descripcionesp: res.descripcionesp,
            descripcionesp2: res.descripcionesp2,
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

    this.membershipForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      description2: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcionesp: ['', Validators.required],
      descripcionesp2: ['', Validators.required],
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
      this.membershipForm.get('image').setValue(file);
    }
  }

  get title() { return this.membershipForm.get('title'); }
  get description() { return this.membershipForm.get('description'); }
  get description2() { return this.membershipForm.get('description2'); }
  get titulo() { return this.membershipForm.get('titulo'); }
  get descripcionesp() { return this.membershipForm.get('descripcionesp'); }
  get descripcionesp2() { return this.membershipForm.get('descripcionesp2'); }
  get video() { return this.membershipForm.get('video'); }
  get videoEsp() { return this.membershipForm.get('videoEsp'); }
  get verVideo() { return this.membershipForm.get('verVideo'); }
  get verImagen() { return this.membershipForm.get('verImagen'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.membershipForm.get('title').value);
    formData.append('description', this.membershipForm.get('description').value);
    formData.append('description2', this.membershipForm.get('description2').value);
    formData.append('titulo', this.membershipForm.get('titulo').value);
    formData.append('descripcionesp', this.membershipForm.get('descripcionesp').value);
    formData.append('descripcionesp2', this.membershipForm.get('descripcionesp2').value);
    formData.append('video', this.membershipForm.get('video').value);
    formData.append('videoEsp', this.membershipForm.get('videoEsp').value);
    formData.append('verVideo', this.membershipForm.get('verVideo').value);
    formData.append('verImagen', this.membershipForm.get('verImagen').value);
    formData.append('is_active', this.membershipForm.get('is_active').value);
    formData.append('image', this.membershipForm.get('image').value);

    const id = this.membershipForm.get('id').value;

    if (id) {
      this.pageService.updateMembership(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/pages']);
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
