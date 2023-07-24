import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserHarmonyData } from 'src/app/models/userHarmonyData';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  constructor(private spotify: SpotifyService, private mongoose: DatabaseService, private ref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.mongoose.getRecommendedFriends(this.spotify.getCurrentUser().topGenre).subscribe(data => this.showRecommendedFriends(data));
  }


  private showRecommendedFriends(data: UserHarmonyData[]) {
    this.recommendedFriends = data.filter(user => user.email != this.spotify.getCurrentUser().email);
    this.ref.detectChanges();
  }

  public refreshRecommendedList(index: number) {
    this.recommendedFriends.splice(index,1);
    this.ref.detectChanges();
  }

  recommendedFriends: UserHarmonyData[] = [];

  friends = [
    {
      name: 'Tony',
      pictureUrl: 'https://media.istockphoto.com/id/1007763808/photo/portrait-of-handsome-latino-african-man.jpg?s=612x612&w=0&k=20&c=XPL1ukeC99OY8HBfNa_njDujOPf9Xz4yCEOo7O3evU0=',
      recommendation: 'Both Like Country',
    },
    {
      name: 'Nancy',
      pictureUrl: 'https://image.shutterstock.com/image-photo/happy-young-indian-woman-blogger-260nw-1606121245.jpg',
      recommendation: 'Both like Rock',
    },
    {
      name: 'Robert',
      pictureUrl: 'https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2020/01/Swamp_People_Season_11_Brock_Theriot_Cast.jpg',
      recommendation: 'Both like Taylor Swift',
    },
    // Add more friends as needed
  ];
}
