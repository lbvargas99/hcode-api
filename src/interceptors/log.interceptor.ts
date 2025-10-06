import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const dt = Date.now();

        return next.handle().pipe(tap(() => {
            const request = context.switchToHttp().getRequest();

            console.log(`url: ${request.url}`)
            console.log(`METHOD: ${request.method}`)
            console.log('execution levou: ' + (Date.now() - dt) + ' ms')
        }))
    }
}