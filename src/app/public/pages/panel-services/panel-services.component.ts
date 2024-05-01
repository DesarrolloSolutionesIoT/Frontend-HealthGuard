import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, Location} from "@angular/common";
import {CardComponent} from "../../../officetech/components/card/card.component";
import {CardHeaderComponent} from "../../../officetech/components/card-header/card-header.component";
import {PanelItemsService} from "../../../officetech/services/panel/panel-items.service";
import {filter} from "rxjs/operators";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-panel-services',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderComponent,
    NgForOf
  ],
  templateUrl: './panel-services.component.html',
  styleUrl: './panel-services.component.css'
})
export class PanelComponent implements OnInit {
  header_titles: string[] = []
  title: string = ""
  data: any[] = []
  id_user: number = 0

  constructor(private router: Router, private route: ActivatedRoute, private panelService: PanelItemsService, private location: Location) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.getTypeUser();
    });
  }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.panelService.getItems().subscribe(
      r=>{
        console.log('r', r)
        const result: any = {};
        for(let i of r) {
          if(!result[i.publisher_id]) {
            result[i.publisher_id] = [{
              first: i.first,
              second : i.second,
              third: i.third,
              fourth: i.fourth
            }]
          }else {
            result[i.publisher_id].push({
              first: i.first,
              second : i.second,
              third: i.third,
              fourth: i.fourth
            })

          }
        }

        this.data = result[this.id_user];
      },
      e=>{
        console.log(e)
      }
    )
  }

  getTypeUser() {
    if (this.location.path().includes('doctor')) {
      this.header_titles = ["Pacient", "Company", "Status", "Due"];
      this.title = "Your current patients"
    }else if(this.location.path().includes('client')){
      console.log('company')
      this.header_titles = ["Consult", "Doctor", "Status", "Due"];
      this.title = "Your current medical consultations"
    }

    try {
      this.route.params.subscribe(params => {
        this.id_user = params['id']
      });
    } catch(e) {
      this.id_user = 1
    }

  }
}
