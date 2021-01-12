import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { selectAll } from 'd3';
import { exit } from 'process';
import { concat } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private rectData: iRect[] = [];

  constructor() {

  }


  ngOnInit() {
    this.initAxes();
    this.initCircles();
    setInterval(this.mClick.bind(this), 1000);
  }

  initCircles() {
    const data: iCirc[] = [];
    for (let i = 1; i < 100; i = i * 2) {
      data.push({ x: i, y: 20 });
    }
    const resp = this.selectSvg().
      selectAll('circle').
      data(data).
      enter().
      append('circle').
      attr('fill', 'red').
      attr('cx', (d: iCirc) => d.x).
      attr('cy', (d: iCirc) => d.y).
      attr('r', 5);
  }

  initAxes() {
    const movingRect: iRect = {
      id: -1,
      x: 0,
      y: 0,
      h: 200,
      w: 5,
      color: 'red'
    }
    this.rectData = this.axisData(3).concat(movingRect);
    this.rectAppender()

  }

  randLoc(): number {
    return 1000 * Math.random();
  }

  rectAppender() {
    //console.log('begin', this.rectData);

    const cs = this.selectSvg().
      selectAll('rect').
      data(this.rectData, (d: iRect) => d.id).
      join(
        enter => enter.
          append('rect').
          attr('fill', d => d.color).
          attr('height', d => d.h).
          attr('width', d => d.w).
          attr('x', d => d.x).
          attr('y', d => d.y),
        update => {
          console.log(update);
          return update.
            attr('fill', d => d.color).
            attr('height', d => d.h).
            attr('width', d => d.w).
            attr('x', d => d.x).
            attr('y', d => d.y)
        },
        exit => exit.remove(),
      );
  }

  axisData(orders: number): iRect[] {
    const factor = 100;
    const ret: iRect[] = [];
    for (let i = 1; i <= orders; i++) {
      for (let j = 1; j <= 10; j += 1) {
        ret.push({
          id: j + (10 * i),
          x: (factor * Math.log(j) + factor * Math.log(10) * i),
          y: 100,
          h: 100,
          w: 3,
          color: 'black'
        });
      }
    }
    return ret;
  }

  selectSvg() {
    return d3.select('.svg-container');
  }

  mClick() {

    this.rectData[this.rectData.length - 1].x = this.randLoc();
    console.log(this.randLoc())
    this.rectAppender();
  }
}

interface iCirc {
  x: number
  y: number
}

interface iRect {
  id: number
  x: number
  y: number
  h: number
  w: number
  color?: string
}
