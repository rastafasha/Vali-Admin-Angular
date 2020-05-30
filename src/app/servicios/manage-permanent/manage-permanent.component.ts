import { Component, OnInit } from '@angular/core';
import { PermanentService } from '../../services/permanent.service';
import { Permanent } from '../../models/permanent';
import { Location } from '@angular/common';


@Component({
  selector: 'app-manage-permanent',
  templateUrl: './manage-permanent.component.html',
  styleUrls: ['./manage-permanent.component.css']
})
export class ManagePermanentComponent implements OnInit {

  title = 'Manage Permanent';
  permanents: Permanent;
  error: string;

  p: Number = 1;
  count: Number = 5;
  constructor(private permanentService: PermanentService, private location: Location) { }

  ngOnInit() {
    this.permanentService.getPermanents().subscribe(
      (data: Permanent) => this.permanents = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.permanentService.deletePermanent(+id).subscribe(
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
