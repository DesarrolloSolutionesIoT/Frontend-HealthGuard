import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {
  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    // ... add the remaining months
  ];

  years = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040];
  paymentForm: FormGroup;
  constructor(private router: Router) {this.paymentForm = new FormGroup({
    cardholderName: new FormControl('', Validators.required),
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
    expirationMonth: new FormControl('', Validators.required),
    expirationYear: new FormControl('', Validators.required),
    cvv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)])
  });}

  ngOnInit() {}

  returnSignUp() {
    this.router.navigate(['sign-up']);
  }
}
