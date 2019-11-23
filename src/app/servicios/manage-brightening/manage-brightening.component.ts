import { Component, OnInit } from '@angular/core';
import { BrighteningService } from '../../services/brightening.service';
import { Brightening } from '../../models/brightening';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-brightening',
  templateUrl: './manage-brightening.component.html',
  styleUrls: ['./manage-brightening.component.css']
})
export class ManageBrighteningComponent implements OnInit {

  title = 'Manage Brightening';
  brightenings: Brightening;
  error: string;

  constructor(private brighteningService: BrighteningService, private location: Location ) { }

  ngOnInit() {
    this.brighteningService.getBrightenings().subscribe(
      (data: Brightening) => this.brightenings = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.brighteningService.deleteBrightening(+id).subscribe(
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
