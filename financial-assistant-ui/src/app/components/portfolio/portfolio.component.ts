import {AfterViewInit, Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import type { EChartsOption } from 'echarts';
import { getInstanceByDom, connect } from 'echarts';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  constructor(private userService: UserService) { }

  options: EChartsOption = {
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'Counters',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  };

  public ngOnInit() {
    console.log(this.userService.getCurrentUser())
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const chartElement1 = document.getElementById('chart1');
      const chartElement2 = document.getElementById('chart2');
      // @ts-ignore
      const chart1 = getInstanceByDom(chartElement1);
      // @ts-ignore
      const chart2 = getInstanceByDom(chartElement2);
      // @ts-ignore
      connect([chart1, chart2]);
    });
  }

}
