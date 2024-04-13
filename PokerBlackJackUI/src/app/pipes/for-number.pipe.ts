import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forNumber',
  standalone: true,
})
export class ForNumberPipe implements PipeTransform {
  transform(value: number, args: string[]): any {
    let res: any = [];
    for (let i = 0; i < value; i++) {
      res.push(i);
    }
    return res;
  }
}
