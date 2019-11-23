import { Component, OnInit } from '@angular/core';
import { SculptingService } from '../../services/sculpting.service';
import { Sculpting } from '../../models/sculpting';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-sculpting',
  templateUrl: './manage-sculpting.component.html',
  styleUrls: ['./manage-sculpting.component.css']
})
export class ManageSculptingComponent implements OnInit {

  title = 'Manage Sculpting';
  sculptings: Sculpting;
  error: string;

  constructor(private sculptingService: SculptingService, private location: Location) { }

  ngOnInit() {
    this.sculptingService.getSculptings().subscribe(
      (data: Sculpting) => this.sculptings = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.sculptingService.deleteSculpting(+id).subscribe(
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
