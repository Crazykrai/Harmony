import { Component } from '@angular/core';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent {
  posts = [
    {
      name: 'Tony',
      pictureUrl: 'https://media.istockphoto.com/id/1007763808/photo/portrait-of-handsome-latino-african-man.jpg?s=612x612&w=0&k=20&c=XPL1ukeC99OY8HBfNa_njDujOPf9Xz4yCEOo7O3evU0=',
      item: 'https://open.spotify.com/track/3Jtn0oLAGr0KFA5J8CaT4C?si=6e37f6b6f4614e92',
      caption: 'Really Good, gvusdjbchdbcbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    },
    {
      name: 'Nancy',
      pictureUrl: 'https://image.shutterstock.com/image-photo/happy-young-indian-woman-blogger-260nw-1606121245.jpg',
      item: 'https://open.spotify.com/track/1xsYj84j7hUDDnTTerGWlH?si=968c1ba5700944d3',
      caption: 'Awesome',
    },
    {
      name: 'Robert',
      pictureUrl: 'https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2020/01/Swamp_People_Season_11_Brock_Theriot_Cast.jpg',
      item: 'https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr?si=abad468d8b924265',
      caption: 'Wow',
    },
    // Add more friends as needed
  ];
}
