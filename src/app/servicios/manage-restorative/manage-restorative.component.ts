import { Component, OnInit } from '@angular/core';
import { RestorativeService } from '../../services/restorative.service';
import { Restorative } from '../../models/restorative';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-restorative',
  templateUrl: './manage-restorative.component.html',
  styleUrls: ['./manage-restorative.component.css']
})
export class ManageRestorativeComponent implements OnInit {

  title = 'Manage Restorative';
  restoratives: Restorative;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private restorativeService: RestorativeService, private location: Location) { }

  ngOnInit() {
    this.restorativeService.getRestoratives().subscribe(
      (data: Restorative) => this.restoratives = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.restorativeService.deleteRestorative(+id).subscribe(
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
