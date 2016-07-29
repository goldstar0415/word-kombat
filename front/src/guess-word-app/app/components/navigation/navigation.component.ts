import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES} from 'angular2/router';

const basePath = 'guess-word-app/app/components/navigation/';

@Component({
  selector: 'navigation',
  templateUrl: basePath + 'navigation.html',
  styleUrls: [basePath + 'navigation.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class NavigationComponent {

}