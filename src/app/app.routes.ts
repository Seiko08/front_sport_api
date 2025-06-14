import { Routes } from '@angular/router';
import { HomeComponent } from './composent/pages/home/home.component';
import { AuthComponent } from './composent/pages/auth/auth.component';
import { authentificationGuard } from './guard/authentification.guard';
import { EventCreateComponent } from './composent/shared/event-create/event-create.component';


export const routes: Routes = [
    {path:'home', component:HomeComponent, canActivate: [authentificationGuard]},
    
    {path:'auth',component:AuthComponent},
    {path: 'event-create',component: EventCreateComponent, canActivate: [authentificationGuard]},
    

    {path: "**", redirectTo: 'home'},
];

