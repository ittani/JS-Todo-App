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
                // Install git, nodejs, and npm (Node Package Manager)
                sh 'sudo apt-get update && sudo apt-get install -y git nodejs npm'
            }
        }

        stage('Checkout Todo App from GitHub') {
            steps {
                echo "Cloning the JS Todo App repository..."
                // Clean the workspace and clone your specific project repository
                git url: 'https://github.com/ittani/JS-Todo-App.git', branch: 'main'
            }
        }

        stage('Install Project Dependencies') {
            steps {
                echo "Running 'npm install' to download dependencies..."
                // npm install reads the package.json file and installs required libraries
                sh 'npm install'
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    echo "Deploying Todo App to ${env.DEPLOY_DIR}..."
                    
                    // Create the deployment directory
                    sh "sudo mkdir -p ${env.DEPLOY_DIR}"
                    
                    // Copy only the necessary frontend files to the deployment directory
                    // We exclude node_modules and the Jenkinsfile
                    sh "sudo rsync -av --exclude 'node_modules' --exclude 'Jenkinsfile' . ${env.DEPLOY_DIR}/"
                    
                    echo "✅ Deployment complete. Your Todo App is now in ${env.DEPLOY_DIR} on the agent."
                }
            }
        }
    }
}