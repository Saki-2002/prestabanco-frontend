pipeline {
    agent any
    environment {
        DB_URL = "jdbc:postgresql://localhost:5435/PrestaBanco"
        DB_NAME = "PrestaBanco"
        DB_USERNAME = "postgres"
        DB_PASSWORD = "123admin"
        PDADMIN_USER = "admin@usach.cl"
        PDADMIN_PASSWORD = "123admin"
    }
    stages {
        stage('Checkout deployment repo') {
            steps {
                dir('deployment') {
                    git branch: 'main', url: 'https://github.com/ByronCaices/devsecops-pep1-deployment.git'
                }
            }
        }
        stage('Checkout frontend repo') {
            steps {
                dir('deployment/devsecops-prestabanco-frontend') {
                    git branch: 'main', url: 'https://github.com/ByronCaices/devsecops-prestabanco-frontend.git'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                // Usamos el mismo project name "prestabanco" para que Compose identifique siempre el mismo grupo de contenedores
                sh 'docker-compose -f deployment/docker-compose.yml -p prestabanco build frontend'
            }
        }
        stage('Deploy Frontend') {
            steps {
                // Primero eliminamos (down) cualquier contenedor previo del proyecto "prestabanco"
                sh 'docker-compose -f deployment/docker-compose.yml -p prestabanco down'
                // Luego levantamos el contenedor con la nueva imagen
                sh 'docker-compose -f deployment/docker-compose.yml -p prestabanco up -d --no-deps --force-recreate --remove-orphans frontend'
            }
        }
    }
}
