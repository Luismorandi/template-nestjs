import { Injectable } from '@nestjs/common';
import { Example } from '../domain/example.domain';

import { AppLogger } from 'src/shared/logger/logger.service';
import { ExampleRepository } from '../infrastructure/example.reposirory';

@Injectable()
export class ExampleService {
    private readonly logger: AppLogger= new AppLogger().withCtx(ExampleService.name)
    constructor(private readonly exampleRepository: ExampleRepository, 
    ) {
    }


    getAll(): Example[] {
        const examples =this.exampleRepository.getAllExamples();

        if (examples.length === 0) {
            this.logger.error(`Not found examples `);
            throw new Error(`Not found examples `);
        }

        return examples;
}
}
