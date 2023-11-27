import { Component } from '@angular/core';
import { faSquareFacebook, faLinkedin, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  icon_Copyright = faCopyright;
  icon_F = faSquareFacebook;
  icon_X = faSquareXTwitter;
  icon_LI = faLinkedin;

  copyrightDate = new Date();
}
