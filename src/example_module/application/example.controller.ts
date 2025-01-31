import {  Controller, Get} from '@nestjs/common';
import { ExampleService } from './example.service';
import { Example } from '../domain/example.domain';


@Controller('examples')
export class ExampleController {

    constructor(private readonly exampleService: ExampleService){

    }
 
    @Get()
    getExamples(): Example[] {
        const response =this.exampleService.getAll();
        return response;
    }


    
}
