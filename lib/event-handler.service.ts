import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';

@Injectable()
export class EventHandler {
  private event_handlers = new Map<string, any[]>();
  constructor(private eventEmitter: EventEmitter2) {}

  async emit(event_name: string, data: any) {
    // return this.eventEmitter.emit(event_name, data);
    const handlers = this.event_handlers.get(event_name) || [];
    for (let index = 0; index < handlers.length; index++) {
      await handlers[0](data);
    }
    return true;
  }

  addListener(event_name: any, func: any) {
    // return this.eventEmitter.addListener(event_name, func);
    const handlers = this.event_handlers.get(event_name) || [];
    handlers.push(func);
    this.event_handlers.set(event_name, handlers);
  }
}
