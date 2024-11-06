pipeline {
    agent any
    stages{
        stage('Build NPM'){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Saki-2002/prestabanco-frontend']])
                bat "npm install"
				bat "npm run build"
            }
        }
		
        stage('Push image to Docker Hub'){
            steps{
                script{
                   withDockerRegistry(credentialsId:'docker-credentials'){
					bat "docker build -t saki2002/react-image ."
					bat "docker push saki2002/react-image"
				   }
                }
            }
        }
    }
}