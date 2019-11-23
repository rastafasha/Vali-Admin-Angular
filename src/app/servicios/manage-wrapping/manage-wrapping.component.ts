import { Component, OnInit } from '@angular/core';
import { WrappingService } from '../../services/wrapping.service';
import { Wrapping } from '../../models/wrapping';
import { Location } from '@angular/common';


@Component({
  selector: 'app-manage-wrapping',
  templateUrl: './manage-wrapping.component.html',
  styleUrls: ['./manage-wrapping.component.css']
})
export class ManageWrappingComponent implements OnInit {

  title = 'Manage Wrapping';
  wrappings: Wrapping;
  error: string;

  constructor(private wrappingService: WrappingService, private location: Location) { }

  ngOnInit() {
    this.wrappingService.getWrappings().subscribe(
      (data: Wrapping) => this.wrappings = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.wrappingService.deleteWrapping(+id).subscribe(
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
