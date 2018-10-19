export const buildImage = `version: '1.0'
steps:
  build_image:
    title: Building Image
    type: build
    #Important: rename this image to to a valid repository in your registry. For example: myUserName/vote
    image_name: codefresh/example
    #The directory should be relative to git repository that is used for cloning
    working_directory: \${{main_clone}}
    #Dockerfile location should be relative to the working directory
    dockerfile: Dockerfile`;

export const runTests = `version: '1.0'
steps:
  test_all_the_code:
    image: node:5
    working_directory: \${{main_clone}}
    commands:
      - npm install gulp -g 
      - npm install
      - gulp unit_test`;

export const launchcomposition = `version: '1.0'
steps:
  build_image:
    title: Building Image
    type: build
    #Important: rename this image to to a valid repository in your registry. For example: myUserName/vote
    image_name: codefresh/example-launch-compose
    #Dockerfile location should be relative to the working directory
    dockerfile: Dockerfile

  launch_composition:
    title: Launch Composition
    type: launch-composition
    composition: docker-compose.yml
    environment_name: 'cf-example-launch-composition'
    entry_point: app
    fail_fast: false
    when:
      branch:
        only:
          - master`;

export const slackMessage = `slack_notify:
image: tutum/curl
commands:
  - curl -X POST --data-urlencode 'payload={"text":"Test slack integration via yaml"}' \${{SLACK_WEB_URL}}`;