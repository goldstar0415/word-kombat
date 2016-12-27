import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { SocketService } from './services/socket.service';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule, [SocketService]);