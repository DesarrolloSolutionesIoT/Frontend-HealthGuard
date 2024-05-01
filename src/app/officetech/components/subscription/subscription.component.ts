import { Component } from '@angular/core';
import {MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscription',
  standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatFormField,
        MatHint,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
      MatCardSubtitle
    ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  constructor(private router: Router) {}
  goToPaymentDetails() {
    this.router.navigate(["sign-up", "subscription", "payment-details"]);
  }
}
