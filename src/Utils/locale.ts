import * as yaml from 'js-yaml';

export class Locale {
  translatorYaml: any = undefined;

  loadValues() {
    if (!this.translatorYaml) {
      this.translatorYaml = yaml.load(sessionStorage.getItem('translator') ?? '');
    }
  }

  public reloadValues() {
    this.translatorYaml = yaml.load(sessionStorage.getItem('translator') ?? '');
  }
  public translateString = (sourceText: string) => {
    try {
      let translatedText = sourceText;
      let hasSource = sourceText in this.translatorYaml;
      if (hasSource) translatedText = this.translatorYaml[sourceText];
      return translatedText;
    } catch (ex) {
      return sourceText;
    }
  };

  public translate = (source: any) => {
    let typeOfParam = typeof source;
    try {
      this.loadValues();
      if ('string' === typeOfParam) {
        return this.translateString(source);
      } else if ('object' === typeOfParam) {
        return this.translateObject(source, this.translatorYaml);
      }
    } catch (err) {
      return source;
    }
  };

  translateObject(obj: any, ymldata: any) {
    for (let key in obj) {
      if (typeof obj[key] == 'object') {
        this.translateObject(obj[key], ymldata);
      } else {
        Object.keys(ymldata).forEach(function (value) {
          if (typeof obj[key] == 'string') {
            if (obj[key].includes(value)) {
              obj[key] = obj[key].replace(value, ymldata[value]);
            }
          }
        });
      }
    }
    return obj;
  }
}
