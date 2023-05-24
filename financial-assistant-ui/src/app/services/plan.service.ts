import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatePlanRequest} from "../models/plan/create/create-plan-request";
import {PlanRepresentation} from "../models/plan/overview/plan-representation";
import {FinancialPlanSummary} from "../models/plan/financial-plan-summary";

@Injectable({
  providedIn:'root'
})
export class PlanService {

  constructor(private http: HttpClient) {
  }

  private readonly PLAN_API = 'http://localhost:8081/plan'


  public createPlan(request: CreatePlanRequest): Observable<PlanRepresentation> {
    return this.http.post<PlanRepresentation>(this.PLAN_API, request);
  }

  public getPlanById(id: number): Observable<PlanRepresentation> {
    return this.http.get<PlanRepresentation>(this.PLAN_API + `/${id}`);
  }

  public getPlansSummariesByUserId(userId: number): Observable<FinancialPlanSummary[]> {
    return this.http.get<FinancialPlanSummary[]>(this.PLAN_API + `/user/${userId}`);
  }

  public deletePlanById(id: number): Observable<void> {
    return this.http.delete<void>(this.PLAN_API + `/${id}`);
  }

}
