import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import { CommentComponent } from '../../../officetech/components/comment/comment.component';
import { ResponsesComponent } from '../../../officetech/components/responses/responses.component';
import ForumCommentEntity from "../../../officetech/models/forum-comment.entity";
import {ForumService} from "../../../officetech/services/forum/forum.service";
import {
  MatDialog,
  MatDialogActions,
  MatDialogContainer,
  MatDialogContent,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    CommentComponent,
    ResponsesComponent,
    NgForOf,
    NgIf,
    MatDialogContainer,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent implements OnInit {
  type_user: number = 1; // here will be the type of the user bringing by event input, 1: team, 0: technician
  id_user: string = "1";
  data: any[] = [];
  answers: any[] = [];
  showNewForm: boolean = false;
  dataNewForum = {
    title: "",
    description: "",
    user_owner: {
      id: 0,
      type_user: "",
      name: "",
      email: "",
      password: "",
    },
    answers: []
  };

  constructor(private forumService: ForumService, private router: Router,
              private route: ActivatedRoute, private authService: AuthService){
  }

  ngOnInit() {
    this.getTypeUser();
    this.getForumPosts();
  }

  getForumPosts() {
    this.forumService.getForumPosts().subscribe(
      result => {
        console.log(result)
        result.forEach((forum: any)=> {
          if(this.id_user == forum.id_user) {
            this.data =forum.forum_posts;
          }
        })



      },
      e => {
        console.log(e);
      }
    )
  }

  getTypeUser() {
    this.route.params.subscribe(params => {
      this.type_user = (params['type_user'] === "client")? 1 : 0;
      this.id_user = params['id'];
      console.log('id', this.id_user)
    })
  }

  receiveAnswers(answers: any[]) {
    this.answers = answers;
  }

  getResponses(id: number) {
    console.log('id', this.id_user)
    this.router.navigate(['forum','responses', this.id_user]);
  }

  newAnswer(id: number) {
    this.router.navigate(['forum','publish', id]);
  }

  showNewForum(){
    this.showNewForm = !this.showNewForm;
  }

  createNewForum() {
    this.authService.getUsers().subscribe(
      (result: any[]) => {
        console.log('result', result)
        this.dataNewForum.user_owner = result.find((user: any) => user.id === parseInt(this.id_user)) || {};

        this.forumService.getForumPosts().subscribe(
          (forums: any[]) => {
            forums.forEach((user_forum: any) => {
              console.log("userforum", user_forum);
              if(user_forum.id_user == this.dataNewForum.user_owner.id) {
                const body_new_post: any = {
                  image: "https://raw.githubusercontent.com/AplicacionesWeb-WX54/si730-WX54-Grupo1-Repository/main/assets/members-profile/nekolas-profile.png",
                  name: this.dataNewForum.user_owner.name,
                  title: this.dataNewForum.title,
                  description: this.dataNewForum.description,
                  answers: this.dataNewForum.answers
                }

                console.log('user', this.dataNewForum.user_owner)

                this.forumService.createForumPost(this.dataNewForum.user_owner.id, body_new_post).subscribe(
                  result => {
                    console.log('post created: ', result);
                    this.getForumPosts();
                    this.showNewForm = false;
                  },
                  e => {
                    console.log(e);
                  }
                )
              }

            })
          }
        )







      },
      e => {
        console.log(e);
      }
    )
  }
}
