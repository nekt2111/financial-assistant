import {Component} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-no-plan',
  templateUrl: './no-plan.component.html',
  styleUrls: ['./no-plan.component.css']
})
export class NoPlanComponent {

  constructor(private router: Router) {
  }

  public navigateToCreatePlan(): void {
    this.router.navigate(['/create-plan']);
  }

  }
