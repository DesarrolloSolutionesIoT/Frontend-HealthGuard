import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle} from "@angular/material/card";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ForumService} from "../../services/forum/forum.service";
import {ActivatedRoute} from "@angular/router";
import ForumCommentEntity from "../../models/forum-comment.entity";
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.css'
})
export class PublishComponent implements OnInit {
  post: ForumCommentEntity | undefined;
  messageControl = new FormControl('',[Validators.required, Validators.maxLength(256)]);
  messages: { id: number, content: string, timestamp: Date }[] = [];
  private messageId = 0;
  constructor(
    private forumService: ForumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const postId = +params['id'];  // Asegúrate de que 'id' sea el nombre correcto del parámetro.
      if (!isNaN(postId)) {
        this.loadPost(postId);
      }
    });
  }

  private loadPost(postId: number) {
    try {
      this.forumService.getForumPosts().subscribe(
        r=>{
          this.post = r.find((post: any) => post.id === postId);
        }
      )
    } catch (error) {
      console.error('Error al cargar la publicación:', error);
    }
  }




  publishMessage() {
    if (this.messageControl.value) {
      // Crea un objeto para cada mensaje

      const newMessage = {
        id: ++this.messageId,
        content: this.messageControl.value,
        timestamp: new Date() // Opcional: agrega una marca de tiempo a cada mensaje
      };
      this.messages.push(newMessage);
      console.log(newMessage);  // Esto es útil para depuración.
      this.messageControl.reset();  // Limpia el input después de enviar.
    }
  }
}
