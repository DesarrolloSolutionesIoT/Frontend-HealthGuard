import { Injectable } from '@angular/core';
import ForumCommentEntity from "../../models/forum-comment.entity";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  baseUrl: string = ""
  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  getForumPosts() {
    return this.http.get<any>(`${this.baseUrl}/api/v1/posts`)
  }

  createForumPost(id: number, post: any) {
    return this.http.post<any>(`${this.baseUrl}/api/v1/posts?id_user=${id}`, post)
  }
}
