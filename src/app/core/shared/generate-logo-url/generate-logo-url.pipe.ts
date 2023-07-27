import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'generateLogoUrl' })
export class GenerateLogoUrlPipe implements PipeTransform {
  transform(teamId: any) {
    return 'https://cdn.sportmonks.com/images/soccer/teams/' + teamId % 32 + '/' + teamId  + '.png';
  }
}
