import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms: Room[] = [];

  constructor(private roomService: RoomService,private databaseSerivce: DatabaseService) {
  }

  ngOnInit(): void {
    // this.roomService.findAll().subscribe(data => {
    //   this.rooms = data;
    // });
    this.GetAllRoomData()
  }

    GetAllRoomData() {
      this.databaseSerivce.getAllRooms().subscribe((response:Room[])=>{
        this.rooms = response


      },(error)=>{
        console.log(error)
      })
    }

}
