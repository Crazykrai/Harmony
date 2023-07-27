import { Component, OnInit } from '@angular/core';
import { SpotifyRecommendation } from 'src/app/models/spotifyRecommendation';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
  styleUrls: ['./recommendation-list.component.css']
})
export class RecommendationListComponent implements OnInit {
  constructor(private mongoose: DatabaseService, private spotify: SpotifyService) {}

  ngOnInit(): void {
    this.mongoose.getRecommendations(this.spotify.getCurrentUser().email).subscribe(data => {
      this.recommendationsList = data;
    })
  }

  public recommendationsList: SpotifyRecommendation[] = [];
  
  public deleteRecommendation(index: number) {
    this.recommendationsList.splice(index,1);
    this.mongoose.updateRecommendations(this.spotify.getCurrentUser().email,this.recommendationsList);
  }
  recommendations = [
    {
      name: 'Tony',
      pictureUrl: 'https://media.istockphoto.com/id/1007763808/photo/portrait-of-handsome-latino-african-man.jpg?s=612x612&w=0&k=20&c=XPL1ukeC99OY8HBfNa_njDujOPf9Xz4yCEOo7O3evU0=',
      item: 'https://open.spotify.com/track/3Jtn0oLAGr0KFA5J8CaT4C?si=6e37f6b6f4614e92',
    },
    {
      name: 'Nancy',
      pictureUrl: 'https://image.shutterstock.com/image-photo/happy-young-indian-woman-blogger-260nw-1606121245.jpg',
      item: 'https://open.spotify.com/track/1xsYj84j7hUDDnTTerGWlH?si=968c1ba5700944d3',
    },
    {
      name: 'Robert',
      pictureUrl: 'https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2020/01/Swamp_People_Season_11_Brock_Theriot_Cast.jpg',
      item: 'https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr?si=abad468d8b924265',
    },
    // Add more friends as needed
  ];
}
