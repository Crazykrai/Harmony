import { Component, OnInit } from '@angular/core';
import mongoose from 'mongoose';
import { environment } from 'src/app/environments/environments';
import { SpotifyService } from 'src/app/services/spotify.service';

// Define the schema
const DataSchema = new mongoose.Schema({
  // Define your data fields here
  field1: String,
  field2: Number,
  // ...
});

// Create the model
const DataModel = mongoose.model('Data', DataSchema);

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(private spotify: SpotifyService) {
    this.clientId = environment.CLIENT_ID;
  }

  ngOnInit() {
    if (window.location.href.includes('code')) {
      this.postAuthFlow();
    }
  }
  
  title = 'Harmony';
  clientId = '';
  scope = 'user-read-private user-read-email';
  SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

  code: any;
  spotifyToken: string = '';

  public authorizeFlow() {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: 'http://localhost:4200/',
      scope: this.scope,
      response_type: 'code'
    });
    window.location.href = this.SPOTIFY_AUTHORIZE_URL + '?' + params.toString();
  }

  private postAuthFlow() {
    const params = new URLSearchParams(window.location.search);

    this.code = params.get('code');
    this.spotify.getAccessToken(this.code).subscribe((token) => {
      this.spotifyToken = token.access_token;
      //this.saveDataToMongoDB();
    });
  }

  private saveDataToMongoDB() {
    // Connect to MongoDB
    mongoose.connect('mongodb://localhost:27017/your-database-name', {
      useUnifiedTopology: true,
    } as any).then(() => {
      console.log('Connected to MongoDB');
  
      // Create a new data object
      const newData = new DataModel({
        field1: 'value1',
        field2: 123,
      });
  
      // Save the data object to the database
      newData.save()
      .then(() => {
        console.log('Data saved successfully');
      })
      .catch((err: Error) => {
        console.error('Error saving data:', err);
      })
      .finally(() => {
        // Disconnect from MongoDB
        mongoose.disconnect();
      });
  
    }).catch((err: Error) => {
      console.error('Error connecting to MongoDB:', err);
    });
  }
}
