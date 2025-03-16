pipeline {
    agent {
        docker {
            image 'docker:24.0-dind'  // Official Docker image with DinD support
            args '--privileged -v /var/run/docker.sock:/var/run/docker.sock'  // Required for DinD
        }
    }

    stages {
        stage('Prepare Workspace') {
            steps {
                deleteDir()
            }
        }   

        stage('Install Tools') {
            steps {
                sh '''
                    # Update package list
                    apk update  # Using apk since docker:dind is Alpine-based
                    
                    # Install curl
                    apk add --no-cache curl
                    
                    # Install Node.js and npm
                    apk add --no-cache nodejs npm
                    
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
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: 'https://index.docker.io/v1/']) {
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