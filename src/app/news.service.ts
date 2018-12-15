import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {WsService} from './ws.service';

const NEWS_URL = 'ws://192.168.254.145:8575';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public message: Subject<any>;

  constructor(private wsService: WsService) {

    this.message = <Subject<any>>this.wsService
      .connect(NEWS_URL)
      .map((response: MessageEvent): any => {
        return JSON.parse(response.data);
      });

  }
}
