import { Component, OnInit } from '@angular/core';
import { SubcriptoreService} from '../../services/subcriptores.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registros-form',
  templateUrl: './registros-form.component.html',
  styleUrls: ['./registros-form.component.css']
})
export class RegistrosFormComponent implements OnInit {


  public Editor = ClassicEditor;
  pageTitle: string;
  error: string;
  uploadError: string;

  subcriptoreForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subcriptoreService: SubcriptoreService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Subcribers';
      this.subcriptoreService.getSubcriptore(+id).subscribe(
        res => {
          this.subcriptoreForm.patchValue({
            email: res.email,
            id: res.id
          });
        }
      );
    } else {
      this.pageTitle = 'Create Subcribers';
    }

    this.subcriptoreForm = this.fb.group({
      id: [''],
      email: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.subcriptoreForm.get('image').setValue(file);
    }
  }

  get email() { return this.subcriptoreForm.get('email'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('email', this.subcriptoreForm.get('email').value);
    formData.append('is_featured', this.subcriptoreForm.get('is_featured').value);
    formData.append('is_active', this.subcriptoreForm.get('is_active').value);

    const id = this.subcriptoreForm.get('id').value;

    if (id) {
      this.subcriptoreService.updateSubcriptore(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/subcriptores']);
          }
        },
        error => this.error = error
      );
    } else {
      this.subcriptoreService.createSubcriptore(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/subcriptores']);
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
