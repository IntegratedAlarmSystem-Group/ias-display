import { Injectable } from '@angular/core';

@Injectable()
export class MapService {

  constructor() { }

  getSVGPaths(pathsGroup) {
    const svgPaths = [];
    for (let i = 0; i < pathsGroup.length; i++) {
      const points = pathsGroup[i];
      let pathString = '';
      for (let j = 0; j < points.length; j++) {
        const item = points[j];
        if (j === 0) {
          pathString += 'M' + item.opt_cx + ' ' + item.opt_cy + ' ';
        } else {
          pathString += 'L' + item.opt_cx + ' ' + item.opt_cy + ' ';
        }
      }
      svgPaths.push(pathString);
    }
    return svgPaths;
  }


  mapdataProcessing(placemarksGroups, pathsGroups) {

    /***
    * Scaling and calculation of max and min values
    */

    const X_AXIS_SCALING_FACTOR = 1.1;

    let minCX = Number.MAX_VALUE;
    let minCY = Number.MAX_VALUE;
    let maxCX = Number.MIN_VALUE;
    let maxCY = Number.MIN_VALUE;

    for (let k = 0; k < placemarksGroups.length; k++) {
      const group = placemarksGroups[k];
      for (let i = 0; i < group.length; i++) {
        const item = group[i];
        item.opt_cx *= X_AXIS_SCALING_FACTOR;
        minCX = Math.min(minCX, item.opt_cx);
        minCY = Math.min(minCY, item.opt_cy);
        maxCX = Math.max(maxCX, item.opt_cx);
        maxCY = Math.max(maxCY, item.opt_cy);
      }

    }

    for (let k = 0; k < pathsGroups.length; k++) {
      const group = pathsGroups[k];
      for (let i = 0; i < group.length; i++) {
        const points = group[i];
        for (let j = 0; j < points.length; j++) {
          const item = points[j];
          item.opt_cx *= X_AXIS_SCALING_FACTOR;
          minCX = Math.min(minCX, item.opt_cx);
          minCY = Math.min(minCY, item.opt_cy);
          maxCX = Math.max(maxCX, item.opt_cx);
          maxCY = Math.max(maxCY, item.opt_cy);
        }
      }

    }

    /** Viewbox **/
    const vBoxW = 1.25 * (maxCX - minCX);
    const vBoxH = 1.1 * (maxCY - minCY);
    const viewbox = [0, 0, vBoxW, vBoxH];

    /** Translation and correction of signs for svg coordinates **/
    const X_AXIS_TRANSLATION_FACTOR = 1.05;
    const Y_AXIS_TRANSLATION_FACTOR = 1.1;

    let dx = 0;
    let dy = 0;
    if (minCX < 0) {
      dx = -1.0 * minCX;
    }
    if (maxCY > 0) {
      dy = -1.0 * maxCY;
    }
    for (let k = 0; k < placemarksGroups.length; k++) {
      const group = placemarksGroups[k];
      for (let i = 0; i < group.length ; i++) {
        const item = group[i];
        item.opt_cx += X_AXIS_TRANSLATION_FACTOR * dx;
        item.opt_cy += Y_AXIS_TRANSLATION_FACTOR * dy;
        item.opt_cy *= -1;
      }
    }

    for (let k = 0; k < pathsGroups.length; k++) {
      const group = pathsGroups[k];
      for (let i = 0; i < group.length; i++) {
        const points = group[i];
        for (let j = 0; j < points.length; j++) {
          const item = points[j];
          item.opt_cx += X_AXIS_TRANSLATION_FACTOR * dx;
          item.opt_cy += Y_AXIS_TRANSLATION_FACTOR * dy;
          item.opt_cy *= -1;
        }
      }
    }

    return viewbox;

  }

}
