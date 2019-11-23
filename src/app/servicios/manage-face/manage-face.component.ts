import { Component, OnInit } from '@angular/core';
import { FibrofaceService } from '../../services/fibroface.service';
import { Fibroface } from '../../models/fibroface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-face',
  templateUrl: './manage-face.component.html',
  styleUrls: ['./manage-face.component.css']
})
export class ManageFaceComponent implements OnInit {

  title = 'Manage Face';
  fibrofaces: Fibroface;
  error: string;

  constructor(private fibrofaceService: FibrofaceService, private location: Location) { }

  ngOnInit() {
    this.fibrofaceService.getFibrofaces().subscribe(
      (data: Fibroface) => this.fibrofaces = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.fibrofaceService.deleteFibroface(+id).subscribe(
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
