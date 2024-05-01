import {Component, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-services-ccompany',
  standalone: true,
  imports: [],
  templateUrl: './services-ccompany.component.html',
  styleUrl: './services-ccompany.component.css'
})
export class ServicesCompanyComponent {
  type_user: string;
  id:string;
  constructor(private router: Router){
    this.type_user = this.router.url.split('/')[2];
    this.id = this.router.url.split('/')[3];
  }

  newComment() {
    this.router.navigate(["services",this.type_user, this.id, "new_comment"])
  }

  newRequestService() {
    this.router.navigate(["services",this.type_user, this.id, "new_tech_requirement"]);
  }
}
