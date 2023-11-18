import { Component, OnInit } from '@angular/core';
import { NewUser, User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  profile: User = new User('','','',[],0);

  constructor( private userService: UserService, private tokenService: TokenStorageService){}

  ngOnInit(): void {
      
  }
}
