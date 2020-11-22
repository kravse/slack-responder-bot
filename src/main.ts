require('dotenv').config()
import { Events } from './service-events';
import { webclient } from './service-webclient';


Events.init();
webclient.respond('hi');