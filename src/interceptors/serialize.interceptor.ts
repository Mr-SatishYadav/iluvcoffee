import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('I am running before the handler', context);
    return next.handle().pipe(map((data) => {
      console.log('I am running before response is sent out', data);
      return data;
    }));
  }
}
