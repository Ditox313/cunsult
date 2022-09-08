import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deleteNbsp'
})
export class DeleteNbspPipe implements PipeTransform {

  transform(value: string): any {
    return value.replace('"&nbsp;', '').replace('&nbsp;', '').replace('&nbsp;', ''); // replace tags
  }

}
