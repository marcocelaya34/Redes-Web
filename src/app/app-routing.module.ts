import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdmxComponent } from './cdmx/cdmx.component';
import { GdlComponent } from './gdl/gdl.component';
import { HomeComponent } from './home/home.component';
import { MeridaComponent as DatacenterComponent } from './merida/merida.component';
import { TijuanaComponent } from './tijuana/tijuana.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'Cdmx', component: CdmxComponent },
  { path: 'Gdl', component: GdlComponent },
  { path: 'Tijuana', component: TijuanaComponent },
  { path: 'Datacenter', component: DatacenterComponent },
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
