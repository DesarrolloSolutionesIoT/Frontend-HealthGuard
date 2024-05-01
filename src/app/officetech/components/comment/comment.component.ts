import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit{
  @Input() element: any;
  @Output() answers = new EventEmitter<any>();

  ngOnInit() {
    this.answers.emit(this.element.answers)
  }
}
