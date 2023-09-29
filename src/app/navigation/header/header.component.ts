import { Component } from '@angular/core';
import { faHouse, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  icon_Home = faHouse;
  icon_Contact = faEnvelope;
  icon_About = faUser;
}
