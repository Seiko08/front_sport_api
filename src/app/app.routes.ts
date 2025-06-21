import { Routes } from '@angular/router';
import { HomeComponent } from './composent/pages/home/home.component';
import { AuthComponent } from './composent/pages/auth/auth.component';
import { authentificationGuard } from './guard/authentification.guard';
import { EventCreateComponent } from './composent/shared/event-create/event-create.component';
import { ProfilComponent } from './composent/pages/profil/profil.component';
import { EventDetailsComponent } from './composent/pages/event-details/event-details.component';


export const routes: Routes = [
    {path:'home', component:HomeComponent, canActivate: [authentificationGuard]},

    {path:'auth',component:AuthComponent},
    {path:'event-create',component: EventCreateComponent, canActivate: [authentificationGuard]},
    {path:'profil', canActivate: [authentificationGuard],component:ProfilComponent},
    {path:'event-details/:eventId',component:EventDetailsComponent, canActivate: [authentificationGuard], },
    {path: 'event/edit/:id',component: EventCreateComponent, canActivate: [authentificationGuard]},
    

    {path: "**", redirectTo: 'home'},
];

