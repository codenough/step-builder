import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IStep {
  id: string;
  typeId: string;
  parentId: string;
  name: string;
  description: string;
  image: string;
  children: Set<string>;
}

@Injectable()
export class TemplateConfigService {

  constructor() { }

  getProfileTemlates(): Observable<IStep[]> {
    return of([
      {
        id: '',
        parentId: '0',
        typeId: '1',
        name: 'Build',
        description: 'create build',
        image: 'https://via.placeholder.com/40x40',
        children: new Set<string>()
      },
      {
        id: '',
        parentId: '0',
        typeId: '2',
        name: 'Test',
        description: 'run unit tests',
        image: 'https://via.placeholder.com/40x40',
        children: new Set<string>()
      },
      {
        id: '',
        parentId: '0',
        typeId: '3',
        name: 'Deploy',
        description: 'deploy build',
        image: 'https://via.placeholder.com/40x40',
        children: new Set<string>()
      },
      {
        id: '',
        parentId: '0',
        typeId: '4',
        name: 'Scale',
        description: 'scale app',
        image: 'https://via.placeholder.com/40x40',
        children: new Set<string>()
      }
    ]);
  }
}
