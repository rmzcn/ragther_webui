import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  public isRouteDetail: boolean;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  // sadece geliştirme amacı ile yazılmıştır sonaradan silinecetir
  // ---START---

  public getPostId() : string {
    return this.route.snapshot.paramMap.get("postID");
  }

  // ---END---



}
