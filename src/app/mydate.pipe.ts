import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mydate'
})
export class MydatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log('first:', value, 'second: ', args);
    /* if (args === '$') {
      return (value as number) / 1100;
    } else if (args === 'yen') {
      return (value as number) / 120;
    } */

    return value.toString().substring(0, 16);
  }

}
