import {Component, Input, OnInit} from "@angular/core";
import {PlanService} from "../../../services/plan.service";
import {PlanRepresentation} from "../../../models/plan/overview/plan-representation";
import {ActivatedRoute, Router} from "@angular/router";

export enum OverviewSection {
  VISUALIZATION,
  PORTFOLIO,
  LIVING_CAPITAL,
  REVIEW
}

@Component({
  selector: 'app-plan-overview',
  templateUrl: './plan-overview.component.html',
  styleUrls: ['./plan-overview.component.css']
})
export class PlanOverviewComponent implements OnInit {

  public planRepresentation: PlanRepresentation;
  public getPlan = false;
  public currentSection: OverviewSection;

  public get overviewSections(): typeof OverviewSection {
    return OverviewSection;
  }

  constructor(private planService: PlanService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.planService.getPlanById(+params['id']).subscribe(result => {
        this.planRepresentation = result;
        this.getPlan = true;
        this.currentSection = OverviewSection.LIVING_CAPITAL;
      })
    })
  }

  public changeSection(section: OverviewSection): void {
    this.currentSection = section;
  }


  protected readonly OverviewSection = OverviewSection;
}
