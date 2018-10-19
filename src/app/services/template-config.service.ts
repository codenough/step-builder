import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IStep extends IStepDto {
  id: string;
  parentId: string;
  children: Set<string>;
}

export interface IStepConfig {
  yamlConfig: string;
}

export interface IStepDto {
  typeId: string;
  name: string;
  description: string;
  image: string;
}

const templatesUrl = '/api/v1/templates';

@Injectable()
export class TemplateConfigService {

  constructor(private http: HttpClient) { }

  getProfileTemlates(): Observable<IStepDto[]> {
    return this.http.get<IStepDto[]>(templatesUrl);
  }

  getRandomTemlate(): Observable<IStepDto> {
    return this.http.get<IStepDto>(`${templatesUrl}/random`);
  }

  getYamlConfig(id: string): Observable<IStepConfig> {
    return this.http.get<IStepConfig>(`${templatesUrl}/${id}/config`);
  }
}
