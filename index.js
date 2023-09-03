#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Function to execute shell commands
const execCommand = (command) => {
	try {
		execSync(command, { stdio: "inherit" });
	} catch (error) {
		console.error(`Error executing command: ${command}`);
		process.exit(1);
	}
};

// Main function to setup project
const setupProject = (branch = "spa-js") => {
	const projectName = process.argv[2] || "project-template"; // Get project name from command line arguments

	// Clone the GitHub repository
	const repoURL = "https://github.com/Ardelon/project-template.git";
	execCommand(`git clone -b ${branch} ${repoURL} ${projectName}`);

	// Navigate into project directory
	execCommand(`cd ${projectName}`);

	// Remove .git directory if it exists
	const gitDirPath = path.join(process.cwd(), projectName, ".git");
	if (fs.existsSync(gitDirPath)) {
		execCommand(`rm -rf ${gitDirPath}`);
	}
};

const options = ["spa-js", "spa-ts", "multi-js", "multi-ts", "api-js", "api-ts"];

console.log("Please select an option:");
options.forEach((option, index) => {
	console.log(`${index + 1}. ${option}`);
});

rl.question("Enter the number of your selection: ", (answer) => {
	const selected = parseInt(answer, 10);

	if (isNaN(selected) || selected < 1 || selected > options.length) {
		console.log("Invalid selection.");
	} else {
		console.log(`You selected: ${options[selected - 1]}`);
		// Perform the action based on the selection
		setupProject(options[selected - 1]);
	}

	rl.close();
});
