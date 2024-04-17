pipeline {
    agent {
        label 'agent01'
    }
    environment {
        GITHUB_CREDENTIALS_ID = 'git_duongdx_kma'
        DOCKER_CREDENTIALS_ID = 'docker_duong1200798' // ID of Docker Hub credentials in Jenkins
        DOCKER_IMAGE_NAME = 'duong1200798/socket_app_react' // Name of your Docker Hub repository/image
        NODE_IMAGE = 'node:16-alpine' // Node.js Docker image to use
        REACT_APP_NAME = 'react-socket'
    }
    stages {
        stage("Cleanup Workspace") {
            steps {
                cleanWs()
            }
        }
        // deploy instructions
        stage('Run Tests in Docker Container') {
            when {
                // Run only if it's a pull request creation event
                beforeAgent true
                expression {
                    return currentBuild.changeSets != null
                }
            }
            steps {
                // Run Node.js tests inside a Docker container
                script {
                    docker.image(NODE_IMAGE).inside('-v /var/run/docker.sock:/var/run/docker.sock') {
                        sh 'npm install'
                        sh 'npm run test'
                        sh 'npm run build'
                    }
                }
            }
        }
        // deploy instructions
        stage('Build Docker Image') {
            when {
                // Run only if it's a pull request merge event
                beforeAgent false
                expression {
                    return currentBuild.changeSets == null
                }
            }
            steps {
                // Build Docker image
                script {
                    docker.build(DOCKER_IMAGE_NAME, '.')
                }
            }
        }
        stage('Push to Docker Hub') {
            when {
                // Run only if it's a pull request merge event
                beforeAgent false
                expression {
                    return currentBuild.changeSets == null
                }
            }
            steps {
                // Push Docker image to Docker Hub
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        docker.withRegistry('https://hub.docker.com/', DOCKER_USERNAME, DOCKER_PASSWORD) {
                            docker.image(DOCKER_IMAGE_NAME).push('latest')
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            // Post-build actions if successful
            echo 'Pipeline successfully executed!'
        }
        failure {
            // Post-build actions if failed
            echo 'Pipeline execution failed!'
        }
    }
}