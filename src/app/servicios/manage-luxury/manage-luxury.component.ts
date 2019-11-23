import { Component, OnInit } from '@angular/core';
import { LuxuringService } from '../../services/luxury.service';
import { Luxuring } from '../../models/luxury';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-luxury',
  templateUrl: './manage-luxury.component.html',
  styleUrls: ['./manage-luxury.component.css']
})
export class ManageLuxuryComponent implements OnInit {

  title = 'Manage Luxury';
  luxurings: Luxuring;
  error: string;

  constructor(private luxuringService: LuxuringService, private location: Location) { }

  ngOnInit() {
    this.luxuringService.getLuxurings().subscribe(
      (data: Luxuring) => this.luxurings = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.luxuringService.deleteLuxuring(+id).subscribe(
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
