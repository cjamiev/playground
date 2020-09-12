import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

/* Material Modules*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Flex */
import {FlexLayoutModule} from '@angular/flex-layout';
/* ag-Grid Module*/
import {AgGridModule} from 'ag-grid-angular';

import {GridComponent} from './components/pages/grid/grid.component';
import {FormCellComponent} from './components/pages/grid/form-cell/form-cell.component';
import {BranchService} from './services/branch.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { AboutComponent } from './components/pages/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    HeaderComponent,
    AddTodoComponent,
    AboutComponent,
    GridComponent,
    FormCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AgGridModule.withComponents([FormCellComponent]),
  ],
  providers: [BranchService],
  bootstrap: [AppComponent],
})
export class AppModule { }
