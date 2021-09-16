import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Room } from './room';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomsUrl: string;

  constructor(private http: HttpClient) {
    this.roomsUrl = 'http://localhost:7000/rooms';
  }

  public findAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl);
  }

  public find(room: Room): Observable<Room> {
    return this.http.get<Room>(this.roomsUrl + '/' + room.id);
  }

  public save(room: Room): Observable<Room> {
    const body = { name: room.name, description: room.description, seats: room.seats};
    return this.http.post<Room>(this.roomsUrl, body);
  }

  public update(room: Room): Observable<Room> {
    const body = { name: room.name, description: room.description, seats: room.seats};
    return this.http.put<Room>(this.roomsUrl + '/' + room.id, body);
  }

  public delete(room: Room): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(this.roomsUrl + '/' + room.id);
  }
}
