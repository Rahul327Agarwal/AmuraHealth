def functionName = 'amura-staff'
def region = 'ap-south-1'
def stackName = ""
def jenkinsId = "AWSAccessForJenkins"
def tenantName = ""
def backupBucket = ""
def branch = ''

pipeline {
    agent any

    tools {
        nodejs '18.13.0'
    }

    stages {
        stage('Creating ENV') {
            steps {
                script {
                    if(env.BRANCH_NAME == "master") {
                        jenkinsId = "AWSAccessForJenkinsProd"
                        tenantName = 'amura'
                        branch = "master"
                    } else if (env.BRANCH_NAME.matches("(PMS-|qa).*")) {
                        jenkinsId = "AWSAccessForJenkinsQa"
                        tenantName = "qa"
                        branch = "qa"
                    } else {
                        jenkinsId = "AWSAccessForJenkinsQa"
                        tenantName = "pre-qa"
                        branch = "stage"
                        functionName = "amura-staff"
                    }
					stackName = "${functionName}-${tenantName}"
                    backupBucket = "${functionName}-${tenantName}-backup"
                    println "Stack " + stackName;
                    println "jenkinsId  " + jenkinsId;
                }
            }
        }

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

         stage('Creating Bucket') {
            steps {
                script {
                    try {
                        sh "aws s3 mb s3://${stackName} --region ap-south-1"
                    } catch (err) {
                        echo "PMS Bucket Already Exists, proceeding without creating"
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('Creating Backup Bucket') {
            steps {
                script {
                    try {
                        sh "aws s3 mb s3://${backupBucket} --region ap-south-1"
                    } catch (err) {
                        echo "PMS Backup Bucket Already Exists, proceeding without creating"
                        echo err.getMessage()
                    }
                }
            }
        }
        stage('AwsConfigure') {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: jenkinsId, usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                    sh "aws configure set aws_access_key_id $USERNAME"
                    sh "aws configure set aws_secret_access_key $PASSWORD"
                    sh "aws configure set default.region ap-south-1"
                }
            }
        }
       
        stage('Creating new Build') {
            steps {
                script {
                    if(branch == "master"){
                        sh "npm set registry http://prod.registry.amurahealth.com/"
                    }
                    if(branch == "qa"){
                        sh "npm set registry http://qa.registry.amurahealth.com/"
                    }
                    if(branch == "stage"){
                        sh "npm set registry http://qa.registry.amurahealth.com/"
                    }
                sh "npm cache clean --force"
                sh "whoami"
                sh "pwd"
				sh "rm -rf build node_modules package-lock.json yarn.lock"
                sh "~/artefact-login.sh"
                sh "npm install --global yarn"
                sh "npm -v"
                sh "npm i -g typescript"
                sh "yarn install"
                sh "tsc"
                sh "export NODE_OPTIONS=--max-old-space-size=4096 && npm run build-${tenantName} --verbose && export NODE_OPTIONS=--max-old-space-size=2048"
                }
            }
        }
        stage('Configure') {
            steps {
                script {
                    sh "aws s3api put-bucket-cors --bucket ${stackName} --cors-configuration file://./infra/s3-cors.json"
                    sh "aws s3api put-bucket-policy --bucket ${stackName} --policy file://./infra/s3-policy-${tenantName}.json"
                    sh "aws s3 website s3://${stackName} --index-document index.html --error-document index.html"
                    sh "aws s3api put-bucket-cors --bucket ${backupBucket} --cors-configuration file://./infra/s3-cors.json"
                    sh "aws s3api put-bucket-policy --bucket ${backupBucket} --policy file://./infra/s3-policy-${tenantName}-bkp.json"
                    sh "aws s3 website s3://${backupBucket} --index-document index.html --error-document index.html"
                }
            }
        }
         stage('Backing up') {
            steps {
                script { 
                    println "Clearing previous backup";
                    sh "aws s3 rm s3://${backupBucket} --recursive"
                    println "Now Backing up";
                    sh "aws s3 sync s3://${stackName} s3://${backupBucket} --cache-control max-age=0" 
                }
            }
        }
        stage('Clean') {
            steps {
                script {
                    sh "aws s3 rm s3://${stackName} --recursive"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    //sh "aws s3 sync build/ s3://${stackName} --acl public-read"
                    sh "aws s3 sync dist/ s3://${stackName} --cache-control max-age=0" 
                }
            }
        }
    }
}
