export = releaseNameGenerator;

declare function releaseNameGenerator(
  major?: number | Promise<number>,
  gif?: string | Promise<string>
): Promise<releaseNameGenerator.IRelease>;

declare namespace releaseNameGenerator {
  export interface IRelease {
    gif: string;
    name: string;
    version: number;
  }
}
