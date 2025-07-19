import Generator from "yeoman-generator";
import { QuestionCollection } from "inquirer";

type Questions = {
  name: string;
};

export default class AppGenerator extends Generator {
  private answers!: Questions;

  constructor(args: any, opts: any) {
    super(args, opts);

    this.option("pm", {
      type: String,
      description: "Package manager to use (npm, yarn, pnpm)",
      default: "pnpm",
    });
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

  install() {
    (this.env as any).options.nodePackageManager = (this.options as any)["pm"];
  }
}
