import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../room';
import { DatabaseService } from '../services/database.service';
import { User } from '../user';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  users!:User[]
  rooms!:Room[]
  constructor(private formBuilder: FormBuilder ,private databaseService: DatabaseService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userID: ['', [Validators.required]],
      roomID: ['', [Validators.required]],
      date:['',Validators.required]
  });
  this.GetAllUser()
  this.GetAllRoomData()
  }

  GetAllUser() {
    this.databaseService.getalluser().subscribe((response:User[])=>{
      this.users = response
    })
  }
  GetAllRoomData() {
    this.databaseService.getAllRooms().subscribe((response:Room[])=>{
      this.rooms = response


    },(error)=>{
      console.log(error)
    })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    console.log(this.registerForm.value)
    this.databaseService.addReservation(this.registerForm.value).subscribe((response)=>{
      console.log(response)
    },(error)=>{
      console.log(error)
    })


  }
  get f() { return this.registerForm.controls; }
}
