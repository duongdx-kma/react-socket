pipeline {
    agent {
        label 'agent01'
    }
    environment {
        GITHUB_CREDENTIALS_ID = 'git_duongdx_kma'
        DOCKER_CREDENTIALS_ID = 'docker_duong1200798' // ID of Docker Hub credentials in Jenkins
        DOCKER_IMAGE_NAME = 'duong1200798/socket_app_react' // Name of your Docker Hub repository/image
        NODE_IMAGE = 'node:16-alpine' // Node.js Docker image to use
        TAG = sh(returnStdout: true, script: "git rev-parse --short=10 HEAD").trim()
    }
    triggers {
      GenericTrigger(
       genericVariables: [
        [key: 'ref', value: '$.ref'],
        [key: 'current_status', value: '$.action'],
        [key: 'merged', value: '$.pull_request.merged'],
        [key: 'branch', value: '$.pull_request.base.ref'],
       ],

        causeString: 'Triggered on $ref',
        token: 'secrettoken',
        tokenCredentialId: '',
        printContributedVariables: true,
        printPostContent: true,
        silentResponse: false,
        shouldNotFlatten: false,
        regexpFilterText: '$ref'
      )
    }

    tools {
      nodejs "nodejs-16"
    }
    stages {
        stage('Clean old code') {
           steps {
              // Clean before build
              cleanWs()
              // We need to explicitly checkout from SCM here
              checkout scm
              echo "Building ${env.JOB_NAME}..."
          }
        }

        // deploy instructions
        stage('Run Tests and build testing') {
            steps {
                sh '''
                  npm install
                  npm run build
                '''
            }
            post {
                failure {
                    echo 'Test stage failed!'
                }
            }
        }
        stage('Log Request') {
            steps {
                script {
                    echo "Received webhook payload: ${params.GENERIC_WEBHOOK_PAYLOAD}"
                    echo "testing current data: ${current_status}"
                    echo "${merged}"
                    echo "${ref}"
                    echo "${branch}"
                }
            }
        }
        // deploy instructions
        // https://bit-basics-backup.netlify.app/2019/september/jenkins-job-github-pullrequest/
        // https://www.linkedin.com/pulse/trigger-jenkins-build-when-pull-request-merged-branch-wijerathne/
        stage('Build Docker Image') {
            when {
                expression { return params.current_status == "closed" && params.merged == true && params.branch == "master" }
            }
            steps {
                // Build Docker image
                script {
                    docker.build("${DOCKER_IMAGE_NAME}:${TAG}", '.')
                }
            }
            post {
                failure {
                    echo 'Build stage failed!'
                }
            }
        }
        stage('Push to Docker Hub') {
            when {
                expression { return params.current_status == "closed" && params.merged == true && params.branch == "master" }
            }
            steps {
                // Push Docker image to Docker Hub
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        docker.withRegistry('https://hub.docker.com/', DOCKER_USERNAME, DOCKER_PASSWORD) {
                            docker.image("${DOCKER_IMAGE_NAME}:${TAG}").push()
                        }
                    }
                }
            }
            post {
                failure {
                    echo 'Push image to registry stage failed!'
                }
            }
        }
    }
    post {
        success {
            // Post-build actions if successful
            echo 'Pipeline successfully executed!'
        }
    }
}
