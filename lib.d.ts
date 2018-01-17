export = releaseNameGenerator;

declare function releaseNameGenerator(version?: number): Promise<releaseNameGenerator.IRelease>;

declare namespace releaseNameGenerator {
  export interface IRelease {
    gif: string;
    name: string;
    version: number;
  }
}
