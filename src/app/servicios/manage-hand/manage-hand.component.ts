import { Component, OnInit } from '@angular/core';
import { HandService } from '../../services/hand.service';
import { Hand } from '../../models/hand';
import { Location } from '@angular/common';


@Component({
  selector: 'app-manage-hand',
  templateUrl: './manage-hand.component.html',
  styleUrls: ['./manage-hand.component.css']
})
export class ManageHandComponent implements OnInit {

  title = 'Manage Hand';
  hands: Hand;
  error: string;
  p: Number = 1;
  count: Number = 5;

  constructor(private handService: HandService, private location: Location) { }

  ngOnInit() {
    this.handService.getHands().subscribe(
      (data: Hand) => this.hands = data,
      error => this.error = error
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete id = ' + id)) {
      this.handService.deleteHand(+id).subscribe(
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
