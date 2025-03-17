import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class MessageQueueHubService {
  private eventQueue: Array<{ event: string; data: any }> = [];
  private isProcessing = false;

  constructor(private api: ApiService) {
    this.listenForEvents();
  }

  private listenForEvents() {
    window.addEventListener('shellGetApi', (event: Event) => {
      const detail = (event as CustomEvent).detail;
      this.enqueueEvent('shellGetApi', detail);
    });
  }

  enqueueEvent(event: string, data: any) {
    this.eventQueue.push({ event, data });
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private processQueue() {
    this.isProcessing = true;

    while (this.eventQueue.length > 0) {
      const eventItem = this.eventQueue.shift();

      if (eventItem) {
        const { event, data } = eventItem;
        this.handleEvent(event, data);
      }
    }

    this.isProcessing = false;
  }

  private handleEvent(event: string, data: any) {
    switch (event) {
      case 'shellGetApi':
        const { messageQueueIndex, endpoint, params, skipSpinner } = data;
        this.api.get(endpoint, params, skipSpinner).subscribe((data) => {
          window.dispatchEvent(
            new CustomEvent('listenShellGetApi:' + messageQueueIndex, {
              detail: {
                result: data,
              },
            })
          );
        });
        break;

      default:
        break;
    }
  }

  private emitEvent(eventName: string, data: any) {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  }
}
