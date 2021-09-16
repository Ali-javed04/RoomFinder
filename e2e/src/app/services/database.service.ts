import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../room';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public url = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getAllRooms():Observable<Room[]> {
   return this.httpClient.get<Room[]>(this.url+'/rooms')
  }
  addNewRooms(data:Room) {

    return this.httpClient.post(this.url+'/rooms',data)
  }
  getalluser():Observable<User[]> {
    return this.httpClient.get<User[]> (this.url + '/users')
  }
  addReservation(data:any) {
    return this.httpClient.post(this.url+'/reservations',data)
  }
  getAllReservation() {
    return this.httpClient.get(this.url+'/reservations')
  }
}
