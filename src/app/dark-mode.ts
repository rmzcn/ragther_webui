import * as DarkReader from 'darkreader';

export class DarkMode {
  constructor() {}

  enable(){
    DarkReader.setFetchMethod(window.fetch)
    DarkReader.enable({
      brightness: 100,
      contrast: 110,
      sepia: 10
    });
  }

  isEnabled():boolean{
    return DarkReader.isEnabled();
  }

  disable(){
    DarkReader.disable();
  }
}
