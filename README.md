# TranslationUI
An Angular web application that allows users to translate text to/from all languages supported by Google. Refer to the README.md file inside the TranslationUI folder to run it locally (standard Angular application).

# Overview
The TranslationModule contains all the logic and modules required to make it work, including components from the Angular Material framework. It loads asynchronously to optimize page load and is responsible for translating user input text through the TranslationService, an Angular service that connects to the backend to retrieve translations from the Google Cloud Translation API.

# Disclaimer
The Angular version is a bit old because on my local machine I have a couple of old personal projects that still need to be migrated to the newest Angular version. Therefore, I wasn't free to upgrade Node to the latest version without breaking them.
