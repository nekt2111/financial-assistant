import {Component, Input, OnInit} from "@angular/core";
import {LifeCapitalRepresentation} from "../../../../models/plan/overview/life-capital-representation";

@Component({
  selector: 'app-living-capital',
  templateUrl: './living-capital.component.html',
  styleUrls: ['./living-capital.component.css']
})
export class LivingCapitalComponent implements OnInit {

  @Input()
  public lifeCapital: LifeCapitalRepresentation;

  public ngOnInit(): void {

  }

}
