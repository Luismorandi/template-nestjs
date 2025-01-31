import { Injectable } from '@nestjs/common';

import { Example } from '../domain/example.domain';


@Injectable()
export class ExampleRepository {
    constructor(
    ) {}


getAllExamples(): Example[]{
    const example = new Example("id","Ejemplo 1","Este es un ejemplo para tener un modulo de ejemplo en el template")
    return [example]
}
}
