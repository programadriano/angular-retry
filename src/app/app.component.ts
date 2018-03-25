import { Component } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { saveAs } from 'file-saver/FileSaver';
import { Http, Response, RequestOptions, Headers } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: Http) { }

  saveFile() {
    const headers = new Headers();
    headers.append('Accept', 'text/plain');
    this.http.get('https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg', { headers: headers })
      .toPromise()
      .then(response => this.saveToFileSystem(response));
  }

  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'image/apng' });
    saveAs(blob, filename);
  }
}
