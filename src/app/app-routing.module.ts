import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import { AvailabilityComponent } from './availability/availability.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { MetierComponent } from './metier/metier.component';
import { PeriodessaiComponent } from './periodessai/periodessai.component';
import { ParametreComponent } from './parametre/parametre.component';
import { RoleComponent } from './role/role.component';
import { RouterguardService } from './routerguard.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
    {
        path: 'availability',
        component: AvailabilityComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent,
        data: {
            privilege: "GERER_UTILISATEUR",
        },
        canActivate:[RouterguardService]
    },
    {
        path: 'collaborateur',
        component: CollaborateurComponent,
        data: {
            privilege: "GERER_COLLABORATEUR",
        },
        canActivate:[RouterguardService]
    },
    {
        path: 'metier',
        component: MetierComponent,
        data: {
            privilege: "GERER_METIER",
        },
        canActivate:[RouterguardService]
    },
    {
        path: 'parametres',
        component: ParametreComponent,
        data: {
            privilege: "GERER_PARAMETRES",
        },
        canActivate:[RouterguardService]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'periodessai',
        component: PeriodessaiComponent,
        data: {
            privilege: "GERER_PERIODESSAI",
        },
        canActivate:[RouterguardService]

    },
    {
        path: 'roles',
        component: RoleComponent,
        data: {
            privilege: "GERER_ROLES",
        },
        canActivate:[RouterguardService]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
