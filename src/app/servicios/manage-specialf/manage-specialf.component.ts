import { Component, OnInit } from '@angular/core';
import { SpecialfService } from '../../services/specialf.service';
import { Specialf } from '../../models/specialf';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-specialf',
  templateUrl: './manage-specialf.component.html',
  styleUrls: ['./manage-specialf.component.css']
})
export class ManageSpecialfComponent implements OnInit {

  title = 'Manage Special Face';
  specialfs: Specialf;
  error: string;

  constructor(private specialfService: SpecialfService, private location: Location) { }

  ngOnInit() {
    this.specialfService.getSpecialfs().subscribe(
      (data: Specialf) => this.specialfs = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.specialfService.deleteSpecialf(+id).subscribe(
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
