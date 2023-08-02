import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customId'
})
export class CustomIdPipe implements PipeTransform {

  transform(value: number): string {
    let newValue = '';
    let finalNumber = value.toString();
    let arrayId = finalNumber.split('');
    let amountZeros = 4 - arrayId.length;
    for(let i = 0; i < amountZeros; i++){
      finalNumber = '0' + finalNumber;
    }
    return finalNumber;
  }


}
