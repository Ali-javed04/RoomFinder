import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { RoomService } from '../room.service';
import { Room } from '../room';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {

  room: Room;

  constructor(private route: ActivatedRoute,
    private databaseService: DatabaseService, private router: Router, private roomService: RoomService) {
    this.room = new Room();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    // this.roomService.save(this.room).subscribe(() => this.gotoRoomList());
    this.SaveRoom()
  }

  gotoRoomList(): void {
    this.router.navigate(['/rooms']);
  }

  SaveRoom() {
    let a:any =(this.room.seats)
    let b:number = parseInt(a)
    this.room.seats = b
    console.log('room',this.room)

    this.databaseService.addNewRooms(this.room).subscribe((response)=>{
      console.log(response)
      this.gotoRoomList()

    },(error)=>{
      console.log(error)
    })
  }

}
