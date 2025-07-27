import { QuestionCollection } from "inquirer";
import { BaseGenerator } from "@jazim/gen-utils";

type Questions = {
  name: string;
};

export default class AppGenerator extends BaseGenerator {
  private answers!: Questions;

  constructor(args: any, opts: any) {
    super(args, opts);
  }

  async prompting() {
    const questions: QuestionCollection = [
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        default: this.appname, // Default to current folder name
      },
    ];

    this.answers = await this.prompt(questions);
    this.log(this.answers);
  }

  writing() {
    this.fs.copyTpl(this.templatePath("index.html"), this.destinationPath("index.html"), {
      name: this.answers.name,
    });
  }
}
