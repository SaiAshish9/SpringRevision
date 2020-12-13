import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from './../services/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  name = '';
  message: string;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMsg() {
    this.loading = true;
    this.service
      .executeHelloBeanServiceWithVariable(this.name)
      .subscribe(
        res => this.handleSuccessfulResponse(res),
        err=>this.handleErrorResponse(err)
        );
  }

  handleErrorResponse(err){
     this.message=err.error.message;
     this.loading= false;
  }

  handleSuccessfulResponse(response) {
    this.message = response.message;
    this.loading = false;
  }
}
