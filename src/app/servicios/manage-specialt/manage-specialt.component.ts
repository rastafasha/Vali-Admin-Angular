import { Component, OnInit } from '@angular/core';
import { SpecialtService } from '../../services/specialt.service';
import { Specialt } from '../../models/specialt';
import { Location } from '@angular/common';


@Component({
  selector: 'app-manage-specialt',
  templateUrl: './manage-specialt.component.html',
  styleUrls: ['./manage-specialt.component.css']
})
export class ManageSpecialtComponent implements OnInit {

  title = 'Manage Special treatments';
  specialts: Specialt;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private specialtService: SpecialtService, private location: Location) { }

  ngOnInit() {
    this.specialtService.getSpecialts().subscribe(
      (data: Specialt) => this.specialts = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.specialtService.deleteSpecialt(+id).subscribe(
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
