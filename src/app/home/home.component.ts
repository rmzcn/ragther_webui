import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isPageLoaded: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  // for developement. Will delete...
  setIsPageLoaded(){
    if(this.isPageLoaded){
      this.isPageLoaded = false;
    }
    else{
      this.isPageLoaded = true;
    }
  }

}
