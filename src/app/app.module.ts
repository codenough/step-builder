import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { DraggableListItemComponent } from './components/draggable-list-item.component';
import { DraggableListComponent } from './components/draggable-list.component';
import { HomeComponent } from './components/home.component';
import { TemplateConfigResolver } from './services/template-config.resolver';
import { TemplateConfigService } from './services/template-config.service';

const appRoutes: Routes = [
  { path: 'steps-builder',
    component: DraggableListComponent,
    resolve: {
      templates: TemplateConfigResolver
    } },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DraggableListItemComponent,
    DraggableListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    TemplateConfigService,
    TemplateConfigResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
