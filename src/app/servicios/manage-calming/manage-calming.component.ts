import { Component, OnInit } from '@angular/core';
import { CalmingService } from '../../services/calming.service';
import { Calming } from '../../models/calming';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-calming',
  templateUrl: './manage-calming.component.html',
  styleUrls: ['./manage-calming.component.css']
})
export class ManageCalmingComponent implements OnInit {

  title = 'Manage Calming';
  calmings: Calming;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private calmingService: CalmingService,  private location: Location) { }

  ngOnInit() {
    this.calmingService.getCalmings().subscribe(
      (data: Calming) => this.calmings = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.calmingService.deleteCalming(+id).subscribe(
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
