import * as git from 'simple-git/promise';
import * as path from 'path';
import * as fs from 'fs-extra';
import chalk from 'chalk';
import * as shell from 'shelljs';
import config from '../config/';

export const signature = 'new <project>';
export const description = 'Create a new React Fission project.';

export const handle = async (project) => {
  const origin = config.repository;
  const local = path.resolve(process.cwd(), project);

  try {
    console.log(
      chalk.white(`Copying files from ${origin}.`),
    );

    await git().clone(origin, local);

    console.log(
      chalk.white('Starting a new repository.'),
    );

    await fs.remove(
      path.resolve(local, '.git'),
    );

    await git(local).init();

    console.log(
      chalk.white('Installing dependencies.'),
    );

    await shell.cd(local);

    const pm = await shell.which('yarn') ? 'yarn' : 'npm';

    await shell.exec(`${pm} install`);

    console.log(
      chalk.white('Copying .env.example to .env.'),
    );

    await fs.copy(
      path.resolve(local, '.env.example'),
      path.resolve(local, '.env'),
    );

    console.log(
      chalk.green(`Project created and ready for development!`),
    );
  } catch (err) {
    console.log(
      chalk.red('Could not create the project.'),
    );
  }
};
