import { Component } from '@angular/core';
import {MatCard, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatButtonModule} from '@angular/material/button';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";
import {UserEntity} from "../../models/user-entity";


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    MatRadioGroup,
    MatRadioButton,
    MatAnchor,
    MatButtonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  hide = true;
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  password: string = "";
  password_confirm: string = "";
  type_user: string = "";

  constructor(private router: Router, private authService: AuthService) {
    this.hide=true;
  }

  goToSubscription() {
    this.authService.getUsers().subscribe(
      (users: any) => {
        const length = users.length;

        const user = new UserEntity(
          length + 1,
          this.first_name + " " + this.last_name,
          this.email,
          this.password,
          this.type_user
        )

        this.authService.createUser(user).subscribe(
          (response: any) => {
            console.log('ok', response);
            this.router.navigate(["sign-up", "subscription"]);
          },
          (error: any) => {
            console.error(error);
            return 0;
          }
        )
      },
      (error: any) => {
        console.error(error);
        return 0;
      }
    )
  }

  goToSignIn() {
    this.router.navigate(["sign-in"]);
  }

  detectPassword(value: string) {
    //console.log(value)
  }

  changeTypeUser(value: string) {
    this.type_user = value;
  }
}
