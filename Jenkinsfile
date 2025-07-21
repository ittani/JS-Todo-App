pipeline {
    // Run on your vagrant agent
    agent { label 'vagrant-agent' }

    stages {
        stage('Run Diagnostics') {
            steps {
                echo '--- Starting Diagnostics ---'

                echo 'Step 1: Checking git version...'
                sh 'git --version'

                echo 'Step 2: Checking current workspace directory...'
                sh 'pwd'

                echo 'Step 3: Listing all remote branches on GitHub...'
                // This is the most important command. It asks GitHub directly
                // "What branches do you have for this repository?"
                // We are looking for 'refs/heads/java' in the output.
                sh 'git ls-remote -h https://github.com/ittani/JS-Todo-App.git'
                
                echo '--- Diagnostics Complete ---'
            }
        }
    }
}