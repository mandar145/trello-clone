import { Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './task/task.component';



export const routes: Routes = [
    { path: 'board', component: BoardComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'list', component: ListComponent },
    { path: 'task', component: TaskComponent },

    { path: '', redirectTo: '/board', pathMatch: 'full' },
    { path: '**', redirectTo: '/board', pathMatch: 'full' }       
      
];
