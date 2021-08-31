
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { env } from '../env';

export const swaggerSetup = (app: Express) => {
  if (env.swagger.enabled) {
    const schemas = validationMetadatasToSchemas({
      refPointerPrefix: '#/components/schemas/',
      classTransformerMetadataStorage: defaultMetadataStorage,
    })

    const spec = routingControllersToSpec(getMetadataArgsStorage(), {}, {
      components: {
        schemas,
        securitySchemes: {
          access_token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization token'
          }
        }
      },
      info: { title: env.app.name, version: env.app.version, description: env.app.description },
    })

    // Add npm infos to the swagger doc

    spec.servers = [
      {
        url: `${env.app.schema}://${env.app.host}:${env.app.port}${env.app.routePrefix}`,
      },
    ];

    app.use(
      '/swagger-ui',
      swaggerUi.serve,
      swaggerUi.setup(spec)
    );

    app.use('/api-docs', (req: any, res: any) => {
      const { host } = req.headers;
      res.status(200).send({ ...spec, host });
    });
  }
}
