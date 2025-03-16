pipeline {
    agent any

    stages {
        stage('Install Tools') {
            steps {
                sh '''
                    # Update package list
                    apt-get update
                    
                    # Install Node.js and npm
                    apt-get install -y curl
                    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
                    apt-get install -y nodejs
                    
                    # Install Docker CLI
                    apt-get install -y docker.io
                    
                    # Verify installations
                    node --version
                    npm --version
                    docker --version
                '''
            }
        }

        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/rayoloo/jenkins-test.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t rayolo/cicd-test:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-credentials',  url: 'https://index.docker.io/v1/']) {
                    sh 'docker push rayolo/cicd-test:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'
            }
        }
    }
}