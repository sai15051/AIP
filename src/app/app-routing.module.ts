import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentsComponent } from './instruments/instruments.component';
import { TodoCompComponent } from './todo-comp/todo-comp.component';
import { InstrumentSummaryComponent } from './instruments/instrument-summary/instrument-summary.component';

const routes: Routes = [
  { path: 'instruments', component: InstrumentsComponent },
  { path: 'instruments/:name', component: InstrumentsComponent },
  { path: 'instruments/:id', component: InstrumentsComponent }, 
  { path: 'todo', component: TodoCompComponent },
  { path: 'instruments-summary', component: InstrumentSummaryComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },  // Default route
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
