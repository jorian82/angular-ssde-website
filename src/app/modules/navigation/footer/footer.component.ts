import { Component } from '@angular/core';
import { faFacebookF, faGooglePlus, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { faF, faG, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  icon_Copyright = faCopyright;
  icon_F = faFacebookF;
  icon_G = faGooglePlus;
  icon_X = faXTwitter;
  icon_LI = faLinkedinIn;
  
  copyrightDate = new Date();
}
