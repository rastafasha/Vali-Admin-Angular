import { Component, OnInit } from '@angular/core';
import { BodyService } from '../../services/body.service';
import { Body } from '../../models/body';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-body',
  templateUrl: './manage-body.component.html',
  styleUrls: ['./manage-body.component.css']
})
export class ManageBodyComponent implements OnInit {

  title = 'Manage Body';
  bodys: Body;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private bodyService: BodyService, private location: Location) { }

  ngOnInit() {
    this.bodyService.getBodys().subscribe(
      (data: Body) => this.bodys = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.bodyService.deleteBody(+id).subscribe(
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
