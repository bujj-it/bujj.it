# bujj.it

A simple to use budgeting app. 

## Requirements Specification

### 1. Intro 

Budgeting app which is as simple to use as possible and which shows users how to keep track of their finances and save a percentage of their monthly income. 

App must be easy and simple to use, requiring as few clicks, decisions and inputs as possible. 

Scope to add tips/suggestions for improvements & social/game-ified content once MVP is achieved to high standard. 

**MVP:**

1. Landing page with pitch (simple infographic) and Call to Action (sign up/get started) 
2. User sign up
3. User can input income
4. User can input expenses
5. User can choose from several savings rate options, each with associated weekly spend amounts:

   ``` 10% savings rate = £X Weekly Spend | 15% = £Y Weekly Spend | 20% = £Z Weekly Spend  ```

### 1.1 Purpose

To provide an extremely simple framework to help users create a budget so they can control their finances, build long-term financial resilience and save towards their goals. 

### 1.2 Audience

Users who are inexperienced in personal financial matters, lacking information/education. Specifically younger people: teens, students, early 20s, etc.


### 1.3 Tech Stack

| **Function**         | **Tech**          |
| -------------------- | ----------------- |
| **Database Dev**     | PostgresSQL Local |
| **Database Prod**    | PostgresSQL AWS   |
| **Server framework** | Express.js        |
| **Server engine**    | NodeJS            |
| **Client framework** | React SPA         |
| **App format**       | Docker container  |
| **App host**         | AWS Kubernetes    |
| **CI/CD**            | TravisCI          |

### 2. Features & Requirements

| No# | Section        | Requirement                                                                                       | Status           | Priority | Comments | Owner |
| --- | -------------- | ------------------------------------------------------------------------------------------------- | ---------------- | -------- | -------- | ----- |
| 1   | General Design | Designed mobile first                                                                             | Pending sign off | MVP      |          |       |
| 2   | General Design | Site design/layout should be visually appealing and clear/easy to understand.                     | Pending sign off | MVP      |          |       |
| 3   | Landing Page   | Landing Page should have succinct, appealing summary of service.                                  | Pending sign off | MVP      |          |       |
| 4   | Landing Page   | Landing page should have CTA linking to user sign up.                                             | Pending sign off | MVP      |          |       |
| 5   | User Accounts  | Users can sign up for account with name, DOB(?), email & password.                                | Pending sign off | MVP      |          |       |
| 6   | User Accounts  | Users can log in and out.                                                                         | Pending sign off | MVP      |          |       |
| 7   | Budget Calc    | User able to input expenses                                                                       | Pending sign off | MVP      |          |       |
| 8   | Budget Calc    | User able to input income                                                                         | Pending sign off | MVP      |          |       |
| 9   | Budget Calc    | Calc should determine multiple savings rates & associated surplus cash for weekly spend for each. | Pending sign off | MVP      |          |       |
| 10  | Budget Calc    | Process of inputting data should be split into stages.                                            | Pending sign off | MVP      |          |       |
| 11  | Budget Calc    | Each stage of data input should have a clear & succinct explanation                               | Pending sign off | MVP      |          |       |
|     |                |                                                                                                   |                  |          |          |       |
|     |                |                                                                                                   |                  |          |          |       |