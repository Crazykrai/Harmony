import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { DatabaseService } from 'src/app/services/database.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent {

  @Input()
  postList: Post[] = [];
  
  posts = [
    {
      name: 'Tony',
      profileImageUrl: 'https://media.istockphoto.com/id/1007763808/photo/portrait-of-handsome-latino-african-man.jpg?s=612x612&w=0&k=20&c=XPL1ukeC99OY8HBfNa_njDujOPf9Xz4yCEOo7O3evU0=',
      attachmentUrl: 'https://open.spotify.com/track/3Jtn0oLAGr0KFA5J8CaT4C?si=6e37f6b6f4614e92',
      bodyText: 'Really Good, gvusdjbchdbcbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
      datePosted: new Date("2018-01-16"),
    },
    {
      name: 'Nancy',
      profileImageUrl: 'https://image.shutterstock.com/image-photo/happy-young-indian-woman-blogger-260nw-1606121245.jpg',
      attachmentUrl: 'https://open.spotify.com/track/1xsYj84j7hUDDnTTerGWlH?si=968c1ba5700944d3',
      bodyText: 'Awesome',
      datePosted: new Date("2019-01-16"),
    },
    {
      name: 'Robert',
      profileImageUrl: 'https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2020/01/Swamp_People_Season_11_Brock_Theriot_Cast.jpg',
      attachmentUrl: 'https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr?si=abad468d8b924265',
      bodyText: 'Wow',
      datePosted: new Date("2019-11-16"),
    },
    // Add more friends as needed
  ];
}
