import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/BackendServices/todo.service';
import { SessionService } from '../services/BrowserServices/session.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public isRouteDetail: boolean;
  public todoID: number;

  constructor(private route: ActivatedRoute, private todoService: TodoService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.todoID = Number.parseInt(this.getPostId());
  }

  public getPostId() : string {
    return this.route.snapshot.paramMap.get("postID");
  }
}
