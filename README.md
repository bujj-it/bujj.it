# bujj.it

A simple to use budgeting app. 

## Requirements Specification

### 1. Intro 

Budgeting app which is as simple to use as possible and which shows users how to keep track of their finances and save a percentage of their monthly income. 

App must be easy and simple to use, requiring as few clicks, decisions and inputs as possible. 

Scope to add tips/suggestions for improvements & social/game-ified content once MVP is achieved to high standard. 

**MVP:**

1. Landing page with pitch (simple infographic) and Call to Action (get started) 
2. User can input income
3. User can input expenses
4. User can choose from several savings rate options, each with associated weekly spend amounts:

   ``` 10% savings rate = £X Weekly Spend | 15% = £Y Weekly Spend | 20% = £Z Weekly Spend  ```
5. User sign up - this will come after the tool to allow them to save their work. 

### 1.1 Purpose

To provide an extremely simple framework to help users create a budget so they can control their finances, build long-term financial resilience and save towards their goals. 

### 1.2 Audience

Users who are inexperienced in personal financial matters, lacking information/education. Specifically younger people: teens, students, early 20s, etc.

### 1.3 Team

**Dev team:**

[Ben Gittins](https://github.com/squareben1)

[Chris Wood](https://github.com/cpcwood)

**Logo Design:** 

[Joe Carter](http://joecarterdesign.co.uk/)

### 1.4 Tech Stack

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

| No# | Section        | Requirement                                                                                       | Status     | Priority | Comments | Owner |
| --- | -------------- | ------------------------------------------------------------------------------------------------- | ---------- | -------- | -------- | ----- |
| 1   | General Design | Designed mobile first                                                                             | Signed off | MVP      |          |       |
| 2   | General Design | Site design/layout should be visually appealing and clear/easy to understand.                     | Signed off | MVP      |          |       |
| 3   | Landing Page   | Landing Page should have succinct, appealing summary of service.                                  | Signed off | MVP      |          |       |
| 4   | Landing Page   | Landing page should have CTA linking to Calc.                                                     | Signed off | MVP      |          |       |
| 5   | User Accounts  | Users can sign up for account with name, username, DOB, email & password.                         | Signed off | MVP      |
| 6   | User Accounts  | Users can amend account details (name, password, email address)                                   | Signed off | MVP      |          |       |
| 7   | User Accounts  | Users can log in and out.                                                                         | Signed off | MVP      |          |       |
| 8   | Budget Calc    | User able to input expenses                                                                       | Signed off | MVP      |          |       |
| 9   | Budget Calc    | User able to input income                                                                         | Signed off | MVP      |          |       |
| 10  | Budget Calc    | Calc should determine multiple savings rates & associated surplus cash for weekly spend for each. | Signed off | MVP      |          |       |
| 11  | Budget Calc    | Process of inputting data should be split into stages.                                            | Signed off | MVP      |          |       |
| 12  | Budget Calc    | Each stage of data input should have a clear & succinct explanation/instructions.                 | Signed off | MVP      |          | 13    | Budget Calc |
|     |                |                                                                                                   |            |          |          |       |
|     |                |                                                                                                   |            |          |          |       |