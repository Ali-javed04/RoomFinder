import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Reservation} from './reservation';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private resUrl: string;

  constructor(private http: HttpClient) {
    this.resUrl = 'http://localhost:7000/reservations';
  }

  public findAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.resUrl);
  }

  public find(reservation: Reservation): Observable<Reservation> {
    return this.http.get<Reservation>(this.resUrl + '/' + reservation.id);
  }

  public save(reservation: Reservation): Observable<Reservation> {
    const body = { roomId: reservation.room.id, date: reservation.date };
    return this.http.post<Reservation>(this.resUrl, body);
  }

  public update(reservation: Reservation): Observable<Reservation> {
    const body = { roomId: reservation.room.id, date: reservation.date };
    return this.http.put<Reservation>(this.resUrl + '/' + reservation.id, body);
  }

  public delete(reservation: Reservation): Observable<HttpResponse<any>> {
    return this.http.delete<HttpResponse<any>>(this.resUrl + '/' + reservation.id);
  }
}
