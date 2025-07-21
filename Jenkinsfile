pipeline {
    agent { label 'vagrant-agent' }

    environment {
        DEPLOY_DIR = '/var/www/my-todo-app'
    }

    stages {
        stage('Install Build Tools') {
            steps {
                echo 'Ensuring git and Node.js are installed on the agent...'
                sh 'sudo apt-get update && sudo apt-get install -y git nodejs npm'
            }
        }

        stage('Force Checkout of "java" Branch') {
            steps {
                echo "Attempting to force checkout of the 'java' branch..."
                
                // This is a more explicit and robust way to check out code.
                // It cleans the workspace and specifically checks out the 'java' branch.
                checkout(
                    $class: 'GitSCM',
                    branches: [[name: '*/java']],
                    doGenerateSubmoduleConfigurations: false,
                    extensions: [[$class: 'WipeWorkspace']],
                    submoduleCfg: [],
                    userRemoteConfigs: [[url: 'https://github.com/ittani/JS-Todo-App.git']]
                )
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
                    
                    // ADD THIS LINE to fix permissions automatically on every deployment
                    sh "sudo chown -R www-data:www-data ${env.DEPLOY_DIR}"
                    
                    echo "✅ Deployment complete."
                }
            }
        }
    }
}