const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employees = [];

const basicQuestions = [
    {
        type: "list",
        name: "role",
        message: "What is the team member role?",
        choices: [ "Manager", "Engineer", "Intern" ]
    },
    {
        type: "input",
        name: "name",
        message: "What is the name of the team member?"
    },
    {
        type: "input",
        name: "id",
        message: "What is the team member id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
    }
];
const managerQuestion = [
    {
        //only for managers
      type: "input",
      name: "officeNumber",
      message: "What is the office number"
    }
];
const engineerQuestion = [
    {
        // only for engineer
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    }
];
const internQuestion = [
    {
    //only for interns
      type: "input",
      name: "school",
      message: "What is the school that "
    }
];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function promptUser() {
    try{
        const response = await inquirer.prompt(basicQuestions);
        employees.push(response);

        console.log(employees);


        if (response.role === "Manager"){
            var managerResponse = await inquirer.prompt(managerQuestion);
            const manager = new Manager(response.name, response.id, response.email, managerResponse.officeNumber);
            employees.push(manager);
        }

        if (response.role === "Engineer"){
            var engineerResponse = await inquirer.prompt(engineerQuestion);
            const engineer = new Engineer(response.name, response.id, response.email, engineerResponse.github);
            employees.push(engineer);
        }

        if (response.role === "Intern"){
            var internResponse = await inquirer.prompt(internQuestion);
            const intern = new Intern(response.name, response.id, response.email, internResponse.school);
            employees.push(intern);
        }

        console.log(employees);
        console.log(response);
        console.log(managerResponse);

        // render(employees);
        fs.writeFile(outputPath, render(employees), function(err) {
            if (err){
                console.log(err);

            }
                console.log("Data entered!")
        });

    } catch (err){
        console.log(err);
    }
};


// function promptUser() {
//     return inquirer.prompt(basicQuestions);
//   }​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
promptUser();


// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!

