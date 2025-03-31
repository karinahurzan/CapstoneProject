# Capstone Project Template

This project is a template for a capstone web development project, featuring courses in various IT, design, and language categories. It is designed to provide a platform for learning materials and course management. The project utilizes HTML, CSS (Sass), and JavaScript, with linting and Sass compilation integrated into the workflow.

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Sass](https://sass-lang.com/install) (to compile SCSS files into CSS)
- [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/) (for linting JavaScript and SCSS files)

## Getting Started

1. **Clone the repository:**

   First, clone the repository to your local machine.

   git clone git@autocode.git.epam.com:kgurzan/capstone-project-template.git
  
   cd capstone-project-template

2. **Install dependencies:**

Run the following command to install all the necessary dependencies for the project.

npm install


3. **Compile Sass files:**

To compile the SCSS files into CSS, run:

npm install stylelint stylelint-scss stylelint-config-standard-scss --save-dev

npm run compile

This will compile the Sass files in src/scss to the src/css directory.

4. **Run Linting:**

To check for code style issues and potential errors, run the following commands:

npm install eslint --save-dev

- To lint JavaScript files:

   npm run lint:js

  - To lint SCSS files:

   npm run lint:scss

 - To automatically fix linting issues:

   npm run lint:fix

5. **Run the Project Locally:**

You can open the index.html file directly in your browser to view the project. If you want to set up a local development server, consider using a simple tool like Live Server or configuring a local server with a tool like http-server.



**Project Structure**
The project structure is as follows:

/src
  /scss          # SCSS files for styling
  /css           # Compiled CSS files
  /images        # Image assets
  /js            # JavaScript files
  /partials      # HTML pages
  courses.json   # Courses data
index.html      # Main HTML file
package.json    # Node.js configuration

License
This project is licensed under the ISC License.

Author
Karina Hurzan - kgurzan@gmail.com