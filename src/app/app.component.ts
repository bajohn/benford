import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { selectAll } from 'd3';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  constructor() {

  }

  ngOnInit() {
    this.initAxes();
    this.initCircles();
  }

  initCircles() {
    const data: iCirc[] = [];
    for (let i = 1; i < 100; i = i * 2) {
      data.push({ x: i, y: 20 });
    }
    //console.log(this.data);
    const resp = this.selectSvg().
      selectAll('circle').
      data(data).
      enter().
      append('circle').
      attr('fill', 'red').
      attr('cx', (d: iCirc) => d.x).
      attr('cy', (d: iCirc) => d.y).
      attr('r', 5);
    console.log(resp);
  }

  initAxes() {
    this.selectSvg().
      selectAll('rect').
      data(this.axisData(3)).
      enter().
      append('rect').
      attr('fill', 'black').
      attr('height', 100).
      attr('width', 2).
      attr('x', d => d).
      attr('y', 100)
  }

  randLoc() {
    return 1000 * Math.random();
  }

  axisData(orders: number) {
    const factor = 100;
    const ret = [];
    for (let i = 1; i <= orders; i++) {
      for (let j = 1; j <= 10; j += 1) {
        ret.push((factor * Math.log(j)) + factor * Math.log(10) * i);
      }
    }
    console.log(ret);
    return ret;
  }

  selectSvg() {
    return d3.select('.svg-container');
  }


}

interface iCirc {
  x: number
  y: number
}

interface iRect {
  x: number
  y: number
}
