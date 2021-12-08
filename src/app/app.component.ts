import { Component } from '@angular/core';
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bosher.co.nz';
  faLinkedIn = faLinkedin;
  faGitHub = faGithub;
  faEmail = faEnvelope;
}
