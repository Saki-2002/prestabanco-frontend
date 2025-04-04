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
                // Aquí clonamos el repositorio donde tienes tu docker-compose.yml
                dir('deployment') {
                    git branch: 'main', url: 'https://github.com/ByronCaices/devsecops-pep1-deployment.git'
                }
            }
        }

        stage('Checkout frontend repo') {
            steps {
                // Clonamos el repo del frontend EXACTAMENTE en la carpeta 'deployment/devsecops-prestabanco-frontend'
                // para que coincida con "context: ./devsecops-prestabanco-frontend" en tu docker-compose.yml
                dir('deployment/devsecops-prestabanco-frontend') {
                    git branch: 'main', url: 'https://github.com/ByronCaices/devsecops-prestabanco-frontend.git'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                // Usamos el docker-compose.yml que está en 'deployment/'
                // El servicio 'frontend' tiene context ./devsecops-prestabanco-frontend, que ya clonamos
                sh 'docker-compose -f deployment/docker-compose.yml -p prestabanco build frontend'
            }
        }

        stage('Deploy Frontend') {
            steps {
                // Desplegamos sólo el frontend
                sh 'docker-compose -f deployment/docker-compose.yml -p prestabanco up -d --no-deps --force-recreate --remove-orphans frontend'
            }
        }
    }
}
