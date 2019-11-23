import { Component, OnInit } from '@angular/core';
import { BridalService } from '../../services/bridal.service';
import { Bridal } from '../../models/bridal';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-bridal',
  templateUrl: './manage-bridal.component.html',
  styleUrls: ['./manage-bridal.component.css']
})
export class ManageBridalComponent implements OnInit {

  title = 'Manage Bridal';
  bridals: Bridal;
  error: string;

  constructor(private bridalService: BridalService, private location: Location) { }

  ngOnInit() {
    this.bridalService.getBridals().subscribe(
      (data: Bridal) => this.bridals = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.bridalService.deleteBridal(+id).subscribe(
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
