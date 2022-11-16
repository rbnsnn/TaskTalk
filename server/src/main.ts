import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    app.setGlobalPrefix('v1')
    await app.listen(process.env.PORT)
}
bootstrap()
