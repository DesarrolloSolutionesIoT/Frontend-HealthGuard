import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitleGroup,MatCardModule} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitleGroup,
    MatCardContent,
    NgOptimizedImage,
    MatCardModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {
  constructor(private router: Router, private authService: AuthService){}

  addComment() {

  }
}
