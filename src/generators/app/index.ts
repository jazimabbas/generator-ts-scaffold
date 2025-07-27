import { QuestionCollection } from "inquirer";
import { BaseGenerator } from "@jazim/gen-utils";
import { z } from "zod/v4";

type Questions = {
  packageManager: string;
  author: string;
  packageName: string;
  repositoryUrl: string;
};

const authorSchema = z.string().min(1, "Author name is required");
const packageNameSchema = z.string().min(1, "Package name is required");
const repositoryUrlSchema = z.url();

export default class AppGenerator extends BaseGenerator {
  private answers!: Questions;

  constructor(args: any, opts: any) {
    super(args, opts);
  }

  async prompting() {
    const questions: QuestionCollection = [
      {
        type: "input",
        name: "author",
        message: "Author name ?",
        validate: (input: string) => {
          const result = authorSchema.safeParse(input);
          return result.success ? true : z.prettifyError(result.error);
        },
      },
      {
        type: "input",
        name: "packageName",
        message: "Package name ?",
        validate: (input: string) => {
          const result = packageNameSchema.safeParse(input);
          return result.success ? true : z.prettifyError(result.error);
        },
      },
      {
        type: "input",
        name: "repositoryUrl",
        message: "Repository URL ?",
        validate: (input: string) => {
          const result = repositoryUrlSchema.safeParse(input);
          return result.success ? true : z.prettifyError(result.error);
        },
      },
    ];

    this.answers = await this.prompt(questions);
  }

  writing() {
    const files = [".gitignore", "README.md", "tsconfig.json", "package.json", "LICENSE"];
    files.forEach((file) => {
      this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), this.answers);
    });

    this.fs.copy(this.templatePath("src/**/*"), this.destinationPath("src/"));
  }
}
