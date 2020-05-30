import { Component, OnInit } from '@angular/core';
import { LookService } from '../../services/look.service';
import { Look } from '../../models/look';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-look',
  templateUrl: './manage-look.component.html',
  styleUrls: ['./manage-look.component.css']
})
export class ManageLookComponent implements OnInit {

  title = 'Manage Look';
  looks: Look;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private lookService: LookService, private location: Location) { }

  ngOnInit() {
    this.lookService.getLooks().subscribe(
      (data: Look) => this.looks = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.lookService.deleteLook(+id).subscribe(
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
