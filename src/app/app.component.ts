import {Component, OnInit} from '@angular/core';
import {faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bosher.co.nz';
  faLinkedIn = faLinkedin;
  faGitHub = faGithub;
  faEmail = faEnvelope;

  ngOnInit(): void {
    console.log("%cNothing to see here","color: red; font-size: 20px");
  }
}
