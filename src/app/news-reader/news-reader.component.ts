import {Component, OnInit} from '@angular/core';
import {NewsService} from '../news.service';

@Component({
  selector: 'app-news-reader',
  templateUrl: './news-reader.component.html',
  styleUrls: ['./news-reader.component.scss']
})
export class NewsReaderComponent implements OnInit {

  news = [];
  newsArray = [];
  channels = [];
  lastSelectedChannel = '';
  currentChannel = '';
  unreadNewsCount = 0;

  constructor(private newsService: NewsService) {
    newsService.message.subscribe(msg => {
      console.log('response from websocket:', msg);
      if (msg.method === 'news') {
        this.newsArray.push(msg.data);
        if (this.channels.indexOf(msg.data.publisherId) === -1) {
          this.channels.push(msg.data.publisherId);

          if (this.currentChannel === msg.data.publisherId) {
            this.unreadNewsCount += 1;
          }
        }
      }
      console.log(this.newsArray);
    });
  }

  ngOnInit() {
  }

  getChannelNews(channel) {
    this.currentChannel = channel.publisherId;
    this.markReadNews();
    this.news = this.newsArray.filter(i => {
      return i.publisherId === channel;
    });

    this.lastSelectedChannel = channel;
  }


  markReadNews() {
    if (this.lastSelectedChannel) {
      this.newsArray.forEach((i) => {
        if (i.publisherId === this.lastSelectedChannel) {
          i.isRead = true;
        }
      });
    }
  }

}
