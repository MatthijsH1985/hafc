import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'roundNumber' })
export class RoundNumberPipe implements PipeTransform {
  transform(num: number) {
    return Number(num).toFixed(1);
  }
}
