import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-contact',
  templateUrl: './manage-contact.component.html',
  styleUrls: ['./manage-contact.component.css']
})
export class ManageContactComponent implements OnInit {

  title = 'View Contacts';
  contacts: Contact;
  error: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private contactService: ContactService, private location: Location) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(
      (data: Contact) => this.contacts = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.contactService.deleteContact(+id).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
