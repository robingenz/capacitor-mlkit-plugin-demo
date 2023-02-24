import { Platform } from '@ionic/angular';

export const createPlatformSpy = (): jasmine.SpyObj<Platform> =>
  jasmine.createSpyObj('Platform', {
    is: false,
    ready: Promise.resolve(),
  });
