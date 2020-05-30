import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }



  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit User';
      this.userService.getUser(+id).subscribe(
        res => {
          this.userForm.patchValue({
            username: res.username,
            password: res.password,
            first_name: res.first_name,
            last_name: res.last_name,
            is_active: res.is_active,
            id: res.id
          });
          this.imagePath = res.image;
        }
      );
    } else {
      this.pageTitle = 'Create User';
    }

    this.userForm = this.fb.group({
      id: [''],
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      is_featured: ['0'],
      is_active: ['1'],
    });

  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.get('image').setValue(file);
    }
  }

  get username() { return this.userForm.get('username'); }
  get password() { return this.userForm.get('password'); }
  get first_name() { return this.userForm.get('first_name'); }
  get last_name() { return this.userForm.get('last_name'); }

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.userForm.get('username').value);
    formData.append('password', this.userForm.get('password').value);
    formData.append('first_name', this.userForm.get('first_name').value);
    formData.append('last_name', this.userForm.get('last_name').value);
    formData.append('is_featured', this.userForm.get('is_featured').value);
    formData.append('is_active', this.userForm.get('is_active').value);
    formData.append('image', this.userForm.get('image').value);

    const id = this.userForm.get('id').value;

    if (id) {
      this.userService.updateUser(formData, +id).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/users']);
          }
        },
        error => this.error = error
      );
    } else {
      this.userService.createUser(formData).subscribe(
        res => {
          if (res.status === 'error') {
            this.uploadError = res.message;
          } else {
            this.router.navigate(['/users']);
          }
        },
        error => this.error = error
      );
    }

  }

}
