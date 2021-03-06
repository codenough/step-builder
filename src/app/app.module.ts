import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialog, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CodemirrorModule } from 'ng2-codemirror';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { DraggableListItemComponent } from './components/draggable-list-item.component';
import { DraggableListComponent } from './components/draggable-list.component';
import { HomeComponent } from './components/pages/home.component';
import { StepsBuilderComponent } from './components/pages/steps-builder.component';
import { TemplateListComponent } from './components/template-list.component';
import { TemplateConfigResolver } from './services/template-config.resolver';
import { TemplateConfigService } from './services/template-config.service';
import { SettingsDialogComponent } from './shared/components/settings-dialog.component';



const appRoutes: Routes = [
  { path: 'steps-builder',
    component: StepsBuilderComponent,
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
  entryComponents: [
    SettingsDialogComponent
  ],
  declarations: [
    AppComponent,
    DraggableListItemComponent,
    DraggableListComponent,
    HomeComponent,
    SettingsDialogComponent,
    TemplateListComponent,
    StepsBuilderComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CodemirrorModule,
    FormsModule,
    BrowserAnimationsModule,
    OverlayModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    TemplateConfigService,
    TemplateConfigResolver,
    MatDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
