import {
  Component,
  EventEmitter,
  Input,
  Output
  } from '@angular/core';

@Component({
  selector: 'draggable-list-item',
  templateUrl: 'draggable-list-item.component.html',
  styleUrls: ['draggable-list-item.component.scss']
})

export class DraggableListItemComponent {
  @Input() imageSource: string;
  @Input() name: string;
  @Input() description: string;
  @Output() showSettings: EventEmitter<void> = new EventEmitter();
  @Output() addConnection: EventEmitter<void> = new EventEmitter();
}
