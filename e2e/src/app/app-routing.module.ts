import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent} from './room-list/room-list.component';
import { RoomFormComponent} from './room-form/room-form.component';
import { Reservation } from './reservation';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  { path: 'rooms', component: RoomListComponent},
  { path: 'addroom', component: RoomFormComponent},
  { path:'addreservation',component: ReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
