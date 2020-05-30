import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  modalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Modal Home';
      this.modalService.getModal(+id).subscribe(
        res => {
          this.modalForm.patchValue({
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
      this.pageTitle = 'Create Modal home';
    }

    this.modalForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      is_featured: ['0'],
      is_active: ['1'],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.modalForm.get('image').setValue(file);
    }
  }

  get title() { return this.modalForm.get('title'); }
  get description() { return this.modalForm.get('description'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.modalForm.get('title').value);
    formData.append('description', this.modalForm.get('description').value);
    formData.append('is_featured', this.modalForm.get('is_featured').value);
    formData.append('is_active', this.modalForm.get('is_active').value);
    formData.append('image', this.modalForm.get('image').value);

    const id = this.modalForm.get('id').value;

    if (id) {
      this.modalService.updateModal(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/modal']);
          }
        },
        error => this.error = error
      );
    } else {
      this.modalService.createModal(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/modal']);
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
