pipeline {
    // Run this on your vagrant agent
    agent { label 'vagrant-agent' }

    environment {
        // Define the deployment directory for the Todo App
        DEPLOY_DIR = '/var/www/my-todo-app'
    }

    stages {
        stage('Install Build Tools') {
            steps {
                echo 'Ensuring git and Node.js are installed on the agent...'
                sh 'sudo apt-get update && sudo apt-get install -y git nodejs npm'
            }
        }

        stage('Checkout Todo App from GitHub') {
            steps {
                echo "Cloning the JS Todo App repository..."
                // CORRECTED: The hardcoded branch has been removed.
                // This now respects the '*/java' setting from the job configuration.
                git url: 'https://github.com/ittani/JS-Todo-App.git'
            }
        }

        stage('Install Project Dependencies') {
            steps {
                echo "Running 'npm install' to download dependencies..."
                sh 'npm install'
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    echo "Deploying Todo App to ${env.DEPLOY_DIR}..."
                    sh "sudo mkdir -p ${env.DEPLOY_DIR}"
                    sh "sudo rsync -av --exclude 'node_modules' --exclude 'Jenkinsfile' . ${env.DEPLOY_DIR}/"
                    echo "✅ Deployment complete. Your Todo App is now in ${env.DEPLOY_DIR} on the agent."
                }
            }
        }
    }
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Todo App deployment was successful!'
        }
        failure {
            echo 'Todo App deployment failed. Please check the logs for details.'
        }
    }
}
// This Jenkinsfile is designed to deploy a JavaScript Todo App from a GitHub repository to
// a Vagrant-managed server. It ensures the necessary build tools are installed, checks out the
// application code, installs dependencies, and deploys the app to a specified directory on the server.
// The deployment directory is defined in the environment section, and the script uses rsync to
// transfer files while excluding unnecessary directories like 'node_modules' and the Jenkinsfile itself.