import { Component } from '@angular/core';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faF, faG, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  icon_Copyright = faCopyright;
  icon_F = faF;
  icon_G = faG;
  icon_X = faX;
  copyrightDate = new Date();
}
