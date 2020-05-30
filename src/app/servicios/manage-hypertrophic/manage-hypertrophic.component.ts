import { Component, OnInit } from '@angular/core';
import { HypertrophicService } from '../../services/hypertrophic.service';
import { Hypertrophic } from '../../models/hypertrophic';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-hypertrophic',
  templateUrl: './manage-hypertrophic.component.html',
  styleUrls: ['./manage-hypertrophic.component.css']
})
export class ManageHypertrophicComponent implements OnInit {

  title = 'Manage Hypertrophic';
  hypertrophics: Hypertrophic;
  error: string;
  titleesp: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private hypertrophicService: HypertrophicService, private location: Location) { }

  ngOnInit() {
    this.hypertrophicService.getHypertrophics().subscribe(
      (data: Hypertrophic) => this.hypertrophics = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.hypertrophicService.deleteHypertrophic(+id).subscribe(
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
