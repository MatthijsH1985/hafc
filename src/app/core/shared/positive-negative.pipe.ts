import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'positiveNegative'
})
export class PositiveNegativePipe implements PipeTransform {
  transform(value: number): string {
    return (value > 0) ? `+${value}` : (value === 0) ? '' : `${value}`;
  }
}
