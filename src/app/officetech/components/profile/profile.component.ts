import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  name: string = "";
  email: string = "";
  phone: string = "";
  imgUrl: string = "";

  constructor(private router:Router) { }

  ngOnInit(): void {

    this.name = "Nombre del Usuario";
    this.email = "usuario@example.com";
    this.phone = "123456789";
    this.imgUrl = "url_de_la_imagen";
  }

  editProfile() {
    this.router.navigate(["profile", "edit-profile"])
  }
}
