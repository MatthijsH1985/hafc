import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'commentsString'
})

export class CommentsStringPipe implements PipeTransform {
  transform(value: any): any {
    const numberValue = Number(value);
    if (numberValue === 1) {
      return numberValue + ' reactie'
    } else {
      return numberValue + ' reacties'
    }
  }
}
