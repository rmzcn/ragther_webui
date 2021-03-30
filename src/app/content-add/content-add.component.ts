import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationServiceService } from '../location-service.service';
import {} from 'googlemaps';


@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['./content-add.component.css']

})
export class ContentAddComponent implements OnInit {

  constructor(public locationService: LocationServiceService) { }

  // google api key AIzaSyCnZPyFPNUESrouUz7mXbduR6KrPS99BBU
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;


  public text;
  private currLat;
  private currLng;
  private locationError: boolean;

  public ngOnInit(): void {
    this.getLocation();

  }

  initMap(){
    var mapProp = {
      center: new google.maps.LatLng(this.currLat, this.currLng),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  getLocation(){
    this.locationService.getPosition().then(pos=>
      {
        if (typeof pos.lat ===  "number" && typeof pos.lng ===  "number") {
          this.currLat = pos.lat;
          this.currLng = pos.lng;
          this.locationError = false;
        }
        else{
          console.log("Konum alınırken hata");
          this.locationError = true;
        }
        //  console.log(`Positon: ${pos.lat} ${pos.lng}`);
      });
  }




}
