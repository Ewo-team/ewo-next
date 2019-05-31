export abstract class Hydrater {

  public static properties: string[] = [];

  public constructor(values?: any) {

    this.onInit(values);
  }

  protected abstract getProperties(): string[];

  protected onInit(values?: any) {
    if (values !== undefined) {
      console.log({ values, properties: this.getProperties() });
      this.getProperties().forEach((property) => {
        if (values[property] !== undefined) {
          console.log(`assigning ${property}`);
          this[property] = values[property];
        }
      });
    }
  }

}
